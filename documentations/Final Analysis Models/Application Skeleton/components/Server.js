const functions = require("firebase-functions");
const fetch = require("node-fetch");

/**
 * HTTP function that acts as a proxy to bypass Cross-Origin Resource Sharing (CORS)
 * restrictions by forwarding requests to the URA Car Park Availability API.
 * This function is deployed as a Firebase Cloud Function.
 *
 * @function proxyToURA
 * @returns {Promise<void>} A promise that resolves after handling the request.
 */
exports.proxyToURA = functions.https.onRequest(async (req, res) => {});
