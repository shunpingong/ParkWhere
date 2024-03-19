import React from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";

const mapContainerStyle = {
  width: "80%",
  height: "80vh",
  margin: "auto",
};

const Gmap = () => {
  const [latitude, setLatitude] = useState(1.3443944759713704);
  const [longitude, setLongitude] = useState(103.68037761231732);

  var carparkList = [
    { lat: 1.3443944759713704, lng: 103.68037761231732 },
    { lat: 1.3369344, lng: 103.743488 },
  ];

  var favorite = [{ lat: 1.3443944759713704, lng: 103.68037761231732 }];

  // console.log(favorite.some(carparkList[0]));
  // console.log(carparkList[0]);
  // console.log(favorite);

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
        }}
        mapTypeId="roadmap"
      >
        <Searchbar />
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
