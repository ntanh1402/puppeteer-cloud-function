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

    console.log(`Getting html from url: ${url}`);

    const page = await browser.newPage();
    await page.goto(url,
        {waitUntil: ['load', 'networkidle0']}
    );

    let data = await page.content();

    await page.close();

    console.log(`Get html done.`);

    let result = {
      statusCode: 200,
      body: data,
      isBase64Encoded: false,
      headers: {
        'Content-Type': 'text/html',
      },
    };

    callback(null, result);
  } catch (e) {
    console.error(e);
    callback(e);
  }
};

