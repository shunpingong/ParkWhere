import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import SVY21 from "../components/svy21";

import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";

import { auth } from "../backend/firebase";

import { readFavouriteCarparks } from "../backend/command";

const mapContainerStyle = {
  width: "90%",
  height: "90vh",
  margin: "auto",
};

var carparkList = [
  { lat: 1.3443944759713704, lng: 103.68037761231732 },
  { lat: 1.3369344, lng: 103.743488 },
];

// Read favourite carparks
var favorite = null;
readFavouriteCarparks()
  .then((favouriteCarparks) => {
    console.log("Favourite carparks:", favouriteCarparks);
    favorite = favouriteCarparks;
  })
  .catch((error) => {
    console.error("Error fetching favourite carparks:", error);
  });

var svy21Converter = new SVY21();

function Gmap() {
  const [center, setCenter] = useState();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [svy21N, setsvy21N] = useState(30381.1007417506); // Northing in SVY21
  const [svy21E, setsvy21E] = useState(32195.1006872542); // Easting in SVY21
  var latLonCoordinates = svy21Converter.computeLatLon(svy21N, svy21E);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setMapLoaded(true);
        },
        (error) => {
          console.error(`Error getting geolocation: ${error.message}`);
        }
      );

      // Clean up the watcher when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error(`Your browser doesn't support Geolocation`);
    }
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  // Set the originRef to the current center if it exists
  if (center) {
    originRef.current = center;
  }

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  // if (!isLoaded || !mapLoaded) {
  //   return <div>Loading...</div>; // Render a loading indicator until the map is loaded and the location is retrieved
  // }

  async function calculateRoute() {
    if (!originRef.current || destinationRef.current.value === "") {
      return;
    }

    // Get the origin and destination
    const origin = {
      lat: originRef.current.lat,
      lng: originRef.current.lng,
    };

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    if (results) {
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } else {
      alert("Error in calculating route");
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setCenter(null);
    destinationRef.current.value = "";
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="90vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={mapContainerStyle}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            scrollwheel: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          <MarkerF
            position={{
              lat: latLonCoordinates.lat,
              lng: latLonCoordinates.lon,
            }}
            options={{
              icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
            }}
          />
          <MarkerF position={center} />
          {carparkList.map((carpark) => (
            <MarkerF
              position={carpark}
              options={{
                icon: favorite?.some(
                  (favoriteCarpark) =>
                    favoriteCarpark.lat === carpark.lat &&
                    favoriteCarpark.lng === carpark.lng
                )
                  ? "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png"
                  : {
                      url: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
                      scaledSize: new window.google.maps.Size(30, 30),
                    },
              }}
            />
          ))}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete
              options={{
                // types: ["parking"],
                componentRestrictions: { country: "sg" },
              }}
            >
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>
          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default Gmap;
