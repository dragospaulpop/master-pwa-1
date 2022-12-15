import puppeteer from 'puppeteer';

async function main () {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.setViewport({ width: 400, height: 800 });

  await page.goto('http://localhost:8080/');

  await page.waitForSelector('#email');
  await page.type('#email', 'user@test.com');
  await page.type('#pass', 'pass');
  await page.click('#login');

  // await page.waitForNetworkIdle({ idleTime: 2000, timeout: 2000 });

  await wait(2000);

  await page.screenshot({ path: 'ss.png' });

  await browser.close();
}

await main();

function wait (howLong) {
  return new Promise(resolve => {
    setTimeout(resolve, howLong)
  })
}
