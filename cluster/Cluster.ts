import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";

export type Func<T> = (browser: puppeteer.Browser) => Promise<T>;

enum TaskStatus {
  PENDING = "PENDING",
  EXECUTING = "EXECUTING",
  FINISHED = "FINISHED",
}

class Task<T> {
  private id: string;
  private description?: string;
  private status: TaskStatus;
  private func: Func<T>;
  private promise: Promise<T>;

  constructor(id: string, func: Func<T>, description?: string) {
    this.id = id;
    this.status = TaskStatus.PENDING;
    this.func = func;
    this.description = description;
    this.promise = this.createPromise();
  }

  getId(): string {
    return this.id;
  }

  getPromise(): Promise<T> {
    return this.promise;
  }

  getTaskDescription() {
    const taskDesc = `${this.id}${
      this.description ? `{ ${this.description} }` : ""
    }...`;
    return taskDesc;
  }

  async run(browser: puppeteer.Browser) {
    try {
      this.status = TaskStatus.EXECUTING;
      const result = await this.func(browser);
      this.resolvePromise(result);
      this.status = TaskStatus.FINISHED;
    } catch (err) {
      this.rejectPromise(err);
    }
  }

  private resolvePromise(result: T) {}
  private rejectPromise(err: any) {}

  createPromise(): Promise<T> {
    const promise = new Promise<any>((accept, reject) => {
      this.resolvePromise = accept;
      this.rejectPromise = reject;
    });
    return promise;
  }
}

interface PuppeteerSettings {
  headless: boolean;
  args?: any;
}

export interface ClusterSettings {
  workersNumber: number;
  intervalBetweenTasks: number;
  puppeteerSettings: PuppeteerSettings;
}

class ClusterWorker<T> {
  private id: string;
  private intervalBetweenTasks: number;
  private browser: puppeteer.Browser;
  private tasks: Task<T>[] = [];
  private running: boolean = false;

  constructor(
    id: string,
    browser: puppeteer.Browser,
    intervalBetweenTasks: number
  ) {
    this.id = id;
    this.browser = browser;
    this.intervalBetweenTasks = intervalBetweenTasks;
  }

  getId() {
    return this.id;
  }

  async closeWorker() {
    this.running = false;
    console.log(`worker ${this.id} is being closed...`);
    await this.browser.close();
    console.log(`worker ${this.id} has been successfully closed!`);
  }

  /**
   * executes the given function, when it completes
   * the promise returned will be resolved
   *
   * @param func
   */
  execute(task: Task<T>) {
    this.tasks.push(task);
  }

  launch() {
    this.startWorker();
  }

  private delayed(callback: () => Promise<any>, ms: number) {
    return new Promise((accept, reject) => {
      setTimeout(async () => {
        try {
          const result = await callback();
          accept(result);
        } catch (err) {
          reject(err);
        }
      }, ms);
    });
  }

  private async startWorker() {
    this.running = true;

    while (true) {
      if (!this.running) {
        break;
      }

      await this.delayed(async () => {
        if (!this.browser.isConnected()) {
          return;
        }

        const current = this.tasks.shift();

        if (current) {
          console.log(
            `[Worker-${this.id}] executing task ${current.getTaskDescription()}`
          );
          await current.run(this.browser);
          console.log(
            `[Worker-${
              this.id
            }] finished executing task ${current.getTaskDescription()}`
          );
        }
      }, this.intervalBetweenTasks);
    }
  }
}

export default class Cluster<T> {
  private workers: ClusterWorker<T>[] = [];
  private settings: ClusterSettings;

  constructor(settings: ClusterSettings) {
    this.settings = settings;
  }

  /**
   * inicializa o cluster
   * 1. cria os workers
   * 2. inicializa os workers
   */
  async launch() {
    await this.createWorkers();
    this.launchWorkers();
  }

  /**
   * cria os workers e os prepara para execução
   */
  private async createWorkers() {
    const { workersNumber } = this.settings;
    for (let index = 0; index < workersNumber; index++) {
      const worker = await this.createWorker(index);
      this.workers.push(worker);
    }
  }

  /**
   * inicializa os workers, um por um
   */
  launchWorkers() {
    console.log("launching workers...");
    this.workers.forEach((worker) => {
      console.log("launching worker ", worker.getId());
      worker.launch();
    });
  }

  /**
   * finaliza o cluster,
   *
   * 1. itera sobre os workers finalizando-os um por um
   * 2. a promise é resolvida apenas quando todos os
   * clusters são finalizados
   */
  async close() {
    return await Promise.all(
      this.workers.map(async (worker) => {
        return await worker.closeWorker();
      })
    );
  }

  /**
   * cria uma instância de worker
   * @param index posição que ele será armazenado na array
   * @param intervalBetweenTasks intervalo entre os ciclos do worker
   */
  async createWorker(index: number): Promise<ClusterWorker<T>> {
    const { intervalBetweenTasks, puppeteerSettings } = this.settings;

    const browser = await this.createBrowser(index, puppeteerSettings);
    const workerId = `${index + 1}`;
    return new ClusterWorker<T>(workerId, browser, intervalBetweenTasks);
  }

  /**
   * cria uma instância do puppeteer
   * a promise é resolvida quando a instância é criada
   * @param index
   * @param puppeteerArgs
   */
  async createBrowser(
    index: number,
    puppeteerSettings: PuppeteerSettings
  ): Promise<puppeteer.Browser> {
    const { headless } = puppeteerSettings;
    return await puppeteer.launch({ ...puppeteerSettings.args, headless });
  }

  /**
   * adiciona uma task a um worker de maneira randômica
   * @param task
   */
  pushTask(task: Task<T>) {
    const { workersNumber } = this.settings;
    const workerIndex = Number.parseInt(`${Math.random() * workersNumber}`);
    this.workers[workerIndex].execute(task);
  }

  /**
   * executes the given function, when it completes
   * the promise returned will be resolved
   *
   * @param func
   */
  execute(
    func: (browser: any) => Promise<T>,
    description?: string
  ): Promise<T> {
    const taskId = this.generateTaskId();
    const task = new Task<T>(taskId, func, description);
    const promise = task.getPromise();

    this.pushTask(task);

    return promise;
  }

  /**
   * gera o identificador da tarefa
   */
  generateTaskId(): string {
    return uuidv4();
  }
}
