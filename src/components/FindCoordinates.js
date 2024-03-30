/**
 * Finds the latitude and longitude of a place using the Google Maps Geocoding API.
 * @function FindCoordinates
 * @param {string} placeName - The name of the place to find the coordinates for.
 * @param {function} callback - The callback function that receives the latitude and longitude.
 * @returns {void}
 */
const FindCoordinates = (placeName, callback) => {
  const encodedPlaceName = encodeURIComponent(placeName);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedPlaceName}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const location = data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;
      // You can now use the latitude and longitude values as needed
      callback(latitude, longitude);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
};

export { FindCoordinates };
