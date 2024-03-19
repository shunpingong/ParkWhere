const functions = require('firebase-functions');
const fetch = require('node-fetch');

exports.proxyToURA = functions.https.onRequest(async (req, res) => {
  const url = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability";
  const accessKey = "af28342c-a335-4252-b3b7-51cfb8d158ba";
  const token = "cSBab183cf3+amS8q33aUmNf-uk5+d3ZccS8S2rQ8-va55uPbP25fb1D7bb38u-Xg5-xpDD2asGDp8QMhC4@aAB281T1T+5CMY3b";

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'AccessKey': accessKey,
        'Token': token
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from URA API');
  }
});
