const setup = require('./starter-kit/setup');

exports.handler = async (event, context, callback) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  const browser = await setup.getBrowser();
  try {
    const queryStringParameters = event.queryStringParameters || {};
    const {
      url = 'https://google.com',
      landscape = false,
      format = 'A4',
      scale = 1,
      margin = '5mm',
      printBackground = true,
    } = queryStringParameters;

    console.log(`Converting url: ${url}`);
    console.log(`Converting settings: landscape = ${landscape}, 
      format = ${format}, scale = ${scale}, margin = ${margin}`);

    const page = await browser.newPage();
    await page.goto(url,
        {waitUntil: ['load', 'networkidle0']}
    );

    let data = await page.pdf({
      format: format,
      landscape: landscape,
      scale: scale,
      printBackground: printBackground,
      margin: {
        top: margin,
        right: margin,
        bottom: margin,
        left: margin,
      },
    });

    await page.close();

    console.log(`Save to pdf done.`);

    let result = {
      statusCode: 200,
      body: data.toString('base64'),
      isBase64Encoded: true,
      headers: {
        'Content-Type': 'application/pdf',
      },
    };

    callback(null, result);
  } catch (e) {
    console.error(e);
    callback(e);
  }
};

