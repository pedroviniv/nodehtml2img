import { init } from ".";
import nodehtml2img from ".";

(async () => {
  console.log("starting...");
  const cluster = await init();
  console.log("started!");
  setInterval(async () => {
    const img = await nodehtml2img("<h1>Hello, World</h1>");
    console.log(img);
  }, 4000);
})();
