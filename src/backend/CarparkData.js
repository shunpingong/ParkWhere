import { useState, useEffect } from "react";
import axios from "axios";
import { SVY21 } from "../components/svy21";

let cv = new SVY21();

const BASE_URL =
  "https://server-meios66gr-shun-pings-projects.vercel.app/carpark-availability";

const BASE_URL2 =
  "https://server-meios66gr-shun-pings-projects.vercel.app/carpark-address";

async function CarparkData() {
  try {
    const [res1, res2] = await Promise.all([
      axios.get(BASE_URL),
      axios.get(BASE_URL2),
    ]);
    const carparkWithLots = res1.data; // [ {}, {}]
    const carparkWithAddr = res2.data; // [ {}, {}]

    const merge = carparkWithLots.map((item) => {
      const findMatching = carparkWithAddr.find(
        (cp) => cp.car_park_no === item.carpark_number
      );

      const coordinates = cv.computeLatLon(
        findMatching?.y_coord,
        findMatching?.x_coord
      );

      const newObj = findMatching
        ? {
            ...item,
            ...findMatching,
            lat: coordinates.lat.toFixed(7),
            lon: coordinates.lon.toFixed(7),
          }
        : {
            ...item,
            carpark_info: [],
            update_datetime: "Not available",
            lat: coordinates.lat.toFixed(7),
            lon: coordinates.lon.toFixed(7),
          };
      return newObj;
    });
    return merge;
  } catch (error) {
    console.error(error);
  }
}

export { CarparkData };
