import { init, ImageFormat } from ".";
import nodehtml2img from ".";
import { Encoding } from ".";

(async () => {
  console.log("starting...");
  const cluster = await init();
  console.log("started!");
  setInterval(async () => {
    const img = await nodehtml2img("<h1>Hello, World</h1>", {
      encoding: Encoding.BASE_64,
      imageFormat: ImageFormat.JPEG,
      transparent: false,
      quality: 100,
      caching: true,
    });
    console.log("printed");
  }, 300);
})();
