import { init, ImageFormat } from ".";
import nodehtml2img from ".";
import { Encoding } from ".";

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Cruzamentos simples</title>
    <style data-styled="true" data-styled-version="5.1.1">.iPzoLA{width:100%;overflow:scroll;}/*!sc*/
data-styled.g1[id="sc-AxjAm"]{content:"iPzoLA,"}/*!sc*/
.gYoKas{background-color:#fff;border-collapse:collapse;position:relative;}/*!sc*/
.gYoKas thead{color:#fff;text-align:left;}/*!sc*/
.gYoKas thead tr th{padding:8px 12px 8px 12px;font-size:1.2rem;line-height:1.5em;text-align:center;background:#00c6c9;position:-webkit-sticky;position:sticky;top:0;z-index:999;}/*!sc*/
.gYoKas thead tr th:first-of-type{z-index:9999;position:-webkit-sticky;position:sticky;top:0;left:0;}/*!sc*/
.gYoKas thead tr th.respondentes{text-align:center;}/*!sc*/
.gYoKas tbody{position:relative;}/*!sc*/
.gYoKas tbody .pergunta-cruzada-wrapper{font-size:12px;}/*!sc*/
.gYoKas tbody .teste{position:-webkit-sticky;position:sticky;left:0;top:0;background-color:#fff;z-index:9;}/*!sc*/
.gYoKas tbody tr{font-size:1.3rem;color:#6c6c6c;background:#f4f4f4;height:29px;position:relative;}/*!sc*/
.gYoKas tbody tr th{background:#f4f4f4;position:-webkit-sticky;position:-webkit-sticky;position:sticky;top:90px;text-align:left;padding:15px;z-index:99;}/*!sc*/
.gYoKas tbody tr th span{position:-webkit-sticky;position:-webkit-sticky;position:sticky;top:0;left:20px;}/*!sc*/
.gYoKas tbody tr td:first-of-type{text-align:left;}/*!sc*/
.gYoKas tbody tr td{padding:0px 15px 0px 15px;position:relative;text-align:center;border-right-style:solid;border-right-width:1px;border-right-color:rgba(100,100,100,0.1);border-left-style:solid;border-left-width:1px;border-left-color:rgba(100,100,100,0.1);background:#fff;color:#6c6c6c;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgba(255,255,255,0.1);}/*!sc*/
.gYoKas tbody tr td.resultado-cruzamento:hover{cursor:default;background-color:rgba(97,0,130,0.8);color:#fff;font-weight:bold;}/*!sc*/
.gYoKas tbody tr td.respondentes.resultadoNumerico{text-align:right;width:15px;}/*!sc*/
.gYoKas tbody tr td.respondentes.resultadoPercentual{text-align:left;width:15px;}/*!sc*/
.gYoKas tbody tr:first-of-type{background:#f4f4f4;color:#610082;z-index:99;}/*!sc*/
.gYoKas tbody tr:first-of-type td{-webkit-column-span:all;column-span:all;}/*!sc*/
.gYoKas tfoot{color:#fff;text-align:center;z-index:999;}/*!sc*/
.gYoKas tfoot tr td{padding:13px 12px;font-size:14px;font-weight:bold;position:-webkit-sticky;position:sticky;z-index:999;bottom:0;background-color:#00c6c9;}/*!sc*/
.gYoKas tfoot tr td:first-of-type{z-index:9999;position:-webkit-sticky;position:sticky;top:0;left:0;font-weight:bold;}/*!sc*/
data-styled.g2[id="sc-AxirZ"]{content:"gYoKas,"}/*!sc*/
*{margin:0;padding:0;font-family:"Roboto","Helvetica neue","Lato",sans-serif;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}/*!sc*/
*:focus{outline:0;}/*!sc*/
body{background:#ddd;}/*!sc*/
img,object,embed,video,iframe{max-width:100%;height:auto;}/*!sc*/
a{-webkit-text-decoration:none;text-decoration:none;color:inherit;}/*!sc*/
a:hover{-webkit-text-decoration:none;text-decoration:none;}/*!sc*/
ul{list-style:none;}/*!sc*/
:root{font-size:62.5%;}/*!sc*/
.disabled{background:#eee;}/*!sc*/
input:focus,select:focus,textarea:focus{box-shadow:0 0 0 3px rgba(16,194,197,0.5);}/*!sc*/
input{font-size:1.1rem;}/*!sc*/
input::-webkit-input-placeholder{font-size:1.1rem;}/*!sc*/
input::-moz-placeholder{font-size:1.1rem;}/*!sc*/
input:-ms-input-placeholder{font-size:1.1rem;}/*!sc*/
input::placeholder{font-size:1.1rem;}/*!sc*/
.errorMessage{color:red;font-size:1.2rem;padding-left:10px;margin-top:10px;}/*!sc*/
::-webkit-scrollbar{width:5px;height:5px;}/*!sc*/
::-webkit-scrollbar-thumb{background:#bbb;border-radius:5px;}/*!sc*/
::-webkit-scrollbar-thumb:hover{background:rgb(97,0,130);}/*!sc*/
.recharts-legend-item{cursor:pointer;}/*!sc*/
.recharts-legend-item-text{color:#6c6c6c;}/*!sc*/
.recharts-legend-item-text:hover{color:#5c5c5c;}/*!sc*/
.react-tooltip-absolute-container{z-index:999999;}/*!sc*/
data-styled.g4[id="sc-global-inXAOG1"]{content:"sc-global-inXAOG1,"}/*!sc*/
</style>
  </head>
  <style>
    table tbody tr th {
      top: unset !important;
    }
  </style>
  <body style="
    margin: 0;
    position: absolute;
    top: 50%;
    display: table;
    transform: translateY(-50%) rotate(-90deg);
    width: 100%;
    transform-origin: center;
  ">
    <div id="app">
      <div class="sc-AxiKw cydMkg"><div class="sc-AxjAm iPzoLA"><table class="sc-AxirZ gYoKas"><thead><tr><th>Qual é a sua NACIONALIDADE? (RU Espontânea)</th><th class="respondentes" colSpan="2">RESPONDENTES</th><th>Brasileira</th><th>Argentina</th><th>Uruguaia</th><th>Chilena</th><th>Alemã</th><th>Francesa</th><th>Americana</th><th>Venezuelana</th><th>Mexicana</th><th>Espanhola</th><th>Cubana</th><th>Japonesa</th><th>Belga</th><th>Filipina</th><th>Colombiana</th><th>Islandêsa</th><th>Síria</th><th>Argelina</th><th>Inglesa</th><th>Sueca</th><th>Israelense</th></tr></thead><tbody><tr><th colSpan="25"><span class="pergunta-cruzada-wrapper">Das marcas que você indicou acima, por que você acha que seria interessante encontrá-las no aeroporto? (RM Estimulada)</span></th></tr><tr><td class="teste">Você gosta do seu tipo de cozinha</td><td class="respondentes resultadoNumerico"><span>581</span></td><td class="respondentes resultadoPercentual">25,72%</td><td class="resultado-cruzamento " title="Equivale a 540 resposta(s)"><span>92.94%</span></td><td class="resultado-cruzamento " title="Equivale a 22 resposta(s)"><span>3.79%</span></td><td class="resultado-cruzamento " title="Equivale a 2 resposta(s)"><span>0.34%</span></td><td class="resultado-cruzamento " title="Equivale a 5 resposta(s)"><span>0.86%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.17%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.17%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.17%</span></td><td class="resultado-cruzamento " title="Equivale a 2 resposta(s)"><span>0.34%</span></td><td class="resultado-cruzamento " title="Equivale a 3 resposta(s)"><span>0.52%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.17%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.17%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.17%</span></td></tr><tr><td class="teste">Bom custo benefício</td><td class="respondentes resultadoNumerico"><span>476</span></td><td class="respondentes resultadoPercentual">21,07%</td><td class="resultado-cruzamento " title="Equivale a 458 resposta(s)"><span>96.22%</span></td><td class="resultado-cruzamento " title="Equivale a 8 resposta(s)"><span>1.68%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.21%</span></td><td class="resultado-cruzamento " title="Equivale a 2 resposta(s)"><span>0.42%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.21%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.21%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.21%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.21%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.21%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.21%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.21%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td></tr><tr><td class="teste">Preço</td><td class="respondentes resultadoNumerico"><span>419</span></td><td class="respondentes resultadoPercentual">18,55%</td><td class="resultado-cruzamento " title="Equivale a 398 resposta(s)"><span>94.99%</span></td><td class="resultado-cruzamento " title="Equivale a 13 resposta(s)"><span>3.1%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td></tr><tr><td class="teste">Rapidez do serviço</td><td class="respondentes resultadoNumerico"><span>414</span></td><td class="respondentes resultadoPercentual">18,33%</td><td class="resultado-cruzamento " title="Equivale a 398 resposta(s)"><span>96.14%</span></td><td class="resultado-cruzamento " title="Equivale a 7 resposta(s)"><span>1.69%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 2 resposta(s)"><span>0.48%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.24%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td></tr><tr><td class="teste">Bom atendimento ao cliente</td><td class="respondentes resultadoNumerico"><span>303</span></td><td class="respondentes resultadoPercentual">13,41%</td><td class="resultado-cruzamento " title="Equivale a 294 resposta(s)"><span>97.03%</span></td><td class="resultado-cruzamento " title="Equivale a 3 resposta(s)"><span>0.99%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.33%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.33%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.33%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.33%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.33%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 1 resposta(s)"><span>0.33%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td><td class="resultado-cruzamento " title="Equivale a 0 resposta(s)"><span>0%</span></td></tr></tbody><tfoot><tr><td>TOTAIS</td><td colSpan="2">---</td><td><span>94.9%</span></td><td><span>2.88%</span></td><td><span>0.41%</span></td><td><span>0.41%</span></td><td><span>0.16%</span></td><td><span>0.16%</span></td><td><span>0.12%</span></td><td><span>0.12%</span></td><td><span>0.12%</span></td><td><span>0.08%</span></td><td><span>0.08%</span></td><td><span>0.04%</span></td><td><span>0.04%</span></td><td><span>0.04%</span></td><td><span>0.04%</span></td><td><span>0.04%</span></td><td><span>0.04%</span></td><td><span>0.04%</span></td><td><span>0.04%</span></td><td><span>0.04%</span></td><td><span>0.04%</span></td></tr></tfoot></table></div></div>
    </div>
  </body>
</html>
`;

(async () => {
  console.log("starting...");
  const cluster = await init();
  let array = [];
  console.log("started!");
  setInterval(async () => {
    const img = await nodehtml2img(html, {
      encoding: Encoding.BASE_64,
      imageFormat: ImageFormat.JPEG,
      transparent: false,
      quality: 100,
      caching: false,
      viewport: {
        height: 1361,
        width: 600,
        deviceScaleFactor: 2,
      },
    });
    array.push(1);
    console.log("handled: ", array.length);
    console.log("[1] printed: " + img.substring(0, 40) + "...");
  }, 50);

  setInterval(async () => {
    const img = await nodehtml2img(html, {
      encoding: Encoding.BASE_64,
      imageFormat: ImageFormat.PNG,
      transparent: false,
      caching: false,
      viewport: {
        height: 1361,
        width: 600,
        deviceScaleFactor: 2,
      },
    });
    array.push(1);
    console.log("handled: ", array.length);
    console.log("[2] printed: " + img.substring(0, 40) + "...");
  }, 50);
})();
