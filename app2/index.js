const express = require('express');
const requestPromise = require('request-promise');
const app = express();
const port = process.env.PORT || 3001;
const nginxUrl = process.env.NGINX_URL || 'http://localhost:80';
const shippingUrl = `${nginxUrl}/shipping`;
const got = require('got');

async function requestRetry (maxRetryCount = 1) {
  let response;
  try {
    response = await got(shippingUrl, { retry: maxRetryCount }).json();
  } catch(err) {
    console.error('Error to request /shipping => ', err);
    throw err;
  }
  return response
}

app.get('/get', async (req, res) => {
  try {
    const response = await requestRetry();
    console.info(`SUCESS RESPONSE => ${JSON.stringify(response)}`);
    res.send(response);
  } catch (err) {
    console.error('ERROR RESPONSE => Alguma coisa ta errado')
    res.status(500).send('Alguma coisa ta errado');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});