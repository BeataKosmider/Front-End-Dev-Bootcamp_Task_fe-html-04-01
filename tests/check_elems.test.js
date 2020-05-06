const Differencify = require("differencify");
const differencify = new Differencify({ mismatchThreshold: 0 });
let urlToTest = "http://127.0.0.1:8080/";

describe("Zadanie nr. 2", () => {
  const timeout = 30000;
  let page;

  beforeAll(async () => {
    await differencify.launchBrowser({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const target = differencify.init({ chain: false });
    page = await target.newPage();
    await page.goto(urlToTest);
    await page.waitFor(1000);
  }, timeout);
  afterAll(async () => {
    await differencify.cleanup();
  });

  it("Dodano div", async () => {
    const div = await page.$eval("div", elem => !!elem);
    expect(div).toBe(true);
  }, timeout);

  it("Width na mobile jest równy 94%", async () => {
    await page.setViewport({width: 500, height: 1000});
    const bg = await page.$eval("div", elem => getComputedStyle(elem).width === "454.953px");
    expect(bg).toBe(true);
  }, timeout);

  it("Width na szerokości ponad 768px jest równy 640px", async () => {
    await page.setViewport({width: 1024, height: 1000});
    const bg = await page.$eval("div", elem => getComputedStyle(elem).width === "640px");
    expect(bg).toBe(true);
  }, timeout);
});
