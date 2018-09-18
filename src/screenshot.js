const setup = require('./starter-kit/setup');

exports.handler = async (event, context, callback) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  const browser = await setup.getBrowser();
  try {
    const queryStringParameters = event.queryStringParameters || {};
    const {
      url = 'https://google.com',
    } = queryStringParameters;

    console.log(`Converting url: ${url}`);

    const page = await browser.newPage();
    await page.goto(url,
        {waitUntil: ['load', 'networkidle0']}
    );

    let data = await page.screenshot({
      fullPage: true,
    });

    await page.close();

    console.log(`Take screenshot done.`);

    let result = {
      statusCode: 200,
      body: data.toString('base64'),
      isBase64Encoded: true,
      headers: {
        'Content-Type': 'image/png',
      },
    };

    callback(null, result);
  } catch (e) {
    console.error(e);
    callback(e);
  }
};

