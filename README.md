# nodehtml2img

A simple node.js module that renders an HTML content and generates an image from it.

## how it works

**nodehtml2img** uses `puppeteer` to launch an headless browser and render the given html content. Simple like that, nothing more, nothing less.

## usage

using defaults:

```typescript
import nodehtml2img from "nodehtml2img";

const buffer = nodehtml2img("<h1>Hello, World</h1>");
```

- In the example above it will use the following default settings:

```typescript
const defaultSettings: Settings = {
  transparent: false,
  puppeteerArgs: {},
  encoding: Encoding.BINARY,
  imageFormat: ImageFormat.PNG,
};
```

- Using custom settings:

```typescript
import nodehtml2img from "nodehtml2img";

const buffer = nodehtml2img("<h1>Hello, World</h1>", {
  transparent: true,
  puppeteerArgs: {},
  encoding: Encoding.BASE_64,
  imageFormat: ImageFormat.JPEG,
  quality: 95, // from 0 to 100
});
```
