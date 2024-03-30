import SVY21 from "../components/svy21";

/**
 * A function to convert car park data to latitude and longitude.
 * @function CarParkDataConverter
 * @returns {Array} An array of car park objects with latitude and longitude.
 */
function CarParkDataConverter() {
  const carparkData = require("../../src/assets/hdb.json");
  if (Array.isArray(carparkData.result.records)) {
    // Assuming jsonData is your JSON data containing multiple car park objects
    const carparkList = carparkData.result.records.map((carPark) => {
      const svy21N = carPark.y_coord;
      const svy21E = carPark.x_coord;
      var svy21Converter = new SVY21();

      // Convert SVY21 coordinates to latitude and longitude
      const { lat, lon } = svy21Converter.computeLatLon(svy21N, svy21E);

      return {
        cpID: carPark.car_park_no,
        lat: lat,
        lng: lon,
        address: carPark.address,
      };
    });
    return carparkList;
  }
}

export { CarParkDataConverter };
