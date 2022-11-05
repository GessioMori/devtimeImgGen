import puppeteer, { Page } from 'puppeteer';

let page: Page | null;

async function getPage(): Promise<Page> {
  if (page) {
    return page;
  }

  const browser = await puppeteer.launch({
    args: ['--force-color-profile=srgb|generic-rgb|color-spin-gamma24']
  });

  page = await browser.newPage();

  return page;
}

export async function getScreenshot(html: string): Promise<Buffer | string> {
  const page = await getPage();

  await page.setViewport({ width: 800, height: 600 });
  await page.setContent(html);
  await page.evaluateHandle('document.fonts.ready');
  await page.waitForSelector('#card');

  const card = await page.$('#card');

  if (card) {
    const file = await card.screenshot({
      type: 'png'
    });
    return file;
  }

  return '';
}
