const pdf = require('pdf');
const screenshot = require('screenshot');
const html = require('html');

exports.pdf.handler = async (event, context, callback) => {
  pdf.handler(event, context, callback);
};

exports.screenshot.handler = async (event, context, callback) => {
  screenshot.handler(event, context, callback);
};

exports.html.handler = async (event, context, callback) => {
  html.handler(event, context, callback);
};

