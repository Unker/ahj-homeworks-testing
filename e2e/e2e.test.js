import puppetteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 50,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    // server.kill();
  });

  test('should be true if card numbre', async () => {
    await page.goto(baseUrl);

    const form = await page.$('.card-form-widget');
    const input = await form.$('.input');
    const submit = await form.$('.submit');

    await input.type('4111111111111111');
    await submit.click();

    const el = await input.getProperty('className');
    let classList = await el.jsonValue();
    classList = classList.split(' ');

    expect(classList.includes('invalid')).toBe(false);
    expect(classList.includes('valid')).toBe(true);
  });

  test('should be false if card numbre', async () => {
    await page.goto(baseUrl);

    const form = await page.$('.card-form-widget');
    const input = await form.$('.input');
    const submit = await form.$('.submit');

    await input.type('4111111111111112');
    await submit.click();

    const el = await input.getProperty('className');
    let classList = await el.jsonValue();
    classList = classList.split(' ');

    expect(classList.includes('invalid')).toBe(true);
    expect(classList.includes('valid')).toBe(false);
  });
});
