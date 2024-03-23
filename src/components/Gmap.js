import React from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";

import SVY21 from "../components/svy21";

const mapContainerStyle = {
  width: "80%",
  height: "80vh",
  margin: "auto",
};

const Gmap = () => {
  const [latitude, setLatitude] = useState(1.3443944759713704);
  const [longitude, setLongitude] = useState(103.68037761231732);

  var svy21Converter = new SVY21();

  const [svy21N, setsvy21N] = useState(30381.1007417506); // Northing in SVY21
  const [svy21E, setsvy21E] = useState(32195.1006872542); // Easting in SVY21

  var latLonCoordinates = svy21Converter.computeLatLon(svy21N, svy21E);

  console.log(
    "Latitude and Longitude:",
    latLonCoordinates.lat,
    latLonCoordinates.lon
  );

  var carparkList = [
    { lat: 1.3443944759713704, lng: 103.68037761231732 },
    { lat: 1.3369344, lng: 103.743488 },
  ];

  var favorite = [{ lat: 1.3443944759713704, lng: 103.68037761231732 }];

  var center = {
    lat: latitude,
    lng: longitude,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      });
    } else {
      console.error(`Your browser doesn't support Geolocation`);
    }
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={{
          scrollwheel: true,
          mapTypeControl: false,
          zoomControl: true,
          streetViewControl: true,
        }}
        mapTypeId="roadmap"
      >
        <Searchbar />

        <MarkerF
          position={{ lat: latLonCoordinates.lat, lng: latLonCoordinates.lon }}
          options={{
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
          }}
        />
        <MarkerF
          position={center}
          // draggable={true}
          // options={{
          //   icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
          // }}
        />
        {carparkList.map((carpark) => (
          <MarkerF
            position={carpark}
            options={{
              icon: favorite.some(
                (favoriteCarpark) =>
                  favoriteCarpark.lat == carpark.lat &&
                  favoriteCarpark.lng == carpark.lng
              )
                ? "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png"
                : "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            }}
          />
        ))}
        {/* <MarkerF position={center} /> */}
      </GoogleMap>
    </div>
  );
};

export default Gmap;
