import axios from "axios";
import { SVY21 } from "../components/Maps/svy21";

/**
 * @function CarparkData - Fetches carpark data from the API.
 * @returns {Promise<Array>} Array of carpark data objects.
 */
async function CarparkData() {
  let cv = new SVY21();

  const BASE_URL =
    "https://server-delta-opal-43.vercel.app/carpark-availability";
  const BASE_URL2 = "https://server-delta-opal-43.vercel.app/carpark-address";

  try {
    const [res1, res2] = await Promise.all([
      axios.get(BASE_URL),
      axios.get(BASE_URL2),
    ]);

    // Extracting ID and available lots information
    const idAndLotsArray = res1.data.map((item) => ({
      id: item.carpark_number, // Assuming 'carpark_number' is the ID field
      availableLots: item.carpark_info[0].lots_available, // Assuming 'carpark_info' contains lot information
      totalLots: item.carpark_info[0].total_lots,
    }));

    const idAndAddr = res2.data.map((item) => ({
      id: item.car_park_no,
      address: item.address,
      x_coord: item.x_coord,
      y_coord: item.y_coord,
    }));

    const merge = idAndLotsArray.map((item) => {
      const findMatching = idAndAddr.find((cp) => cp.id === item.id);

      const coordinates = cv.computeLatLon(
        findMatching?.y_coord,
        findMatching?.x_coord
      );

      const newObj = {
        cpID: "CP-" + item.id,
        name: "CP-" + item.id,
        availableLots: item.availableLots,
        totalLots: item.totalLots,
        address: findMatching?.address,
        lat: coordinates.lat,
        lng: coordinates.lon,
        weekdayRate: "0.60",
        weekdayMin: "30",
        satdayRate: "0.60",
        satdayMin: "30",
        sunPHRate: "Free",
        startTime: "7:00 AM",
        endTime: "10:30 PM",
      };
      return newObj;
    });
    return merge;
  } catch (error) {
    console.error(error);
  }
}

export { CarparkData };
