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
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
import { readFavouriteCarparks } from "../backend/command";
import { FindCoordinates } from "../components/FindCoordinates";
import { CarParkDataConverter } from "../components/CarParkDataConverter";

const mapContainerStyle = {
  width: "90%",
  height: "90vh",
  margin: "auto",
};

function Gmap() {
  const [center, setCenter] = useState();

  const [favorite, setFavorite] = useState([]);
  const [carparkList, setCarparkList] = useState([]);

  function myLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(`Error getting geolocation: ${error.message}`);
        }
      );
    } else {
      console.error(`Your browser doesn't support Geolocation`);
    }
  }

  useEffect(() => {
    readFavouriteCarparks()
      .then((favouriteCarparks) => {
        setFavorite(favouriteCarparks);
      })
      .catch((error) => {
        console.error("Error fetching favourite carparks:", error);
      });
    myLocation();
    setCarparkList(CarParkDataConverter());

    // console.log("hehe", carparkList);
    // console.log("testing", favorite);
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

  if (!isLoaded) {
    return <div>Loading...</div>; // Render a loading indicator until the map is loaded and the location is retrieved
  }

  async function findCarpark() {
    if (!originRef.current || destinationRef.current.value === "") {
      return;
    }
    FindCoordinates(destinationRef.current.value, (latitude, longitude) => {
      setCenter({ lat: latitude, lng: longitude });
      map.panTo(center);
      map.setZoom(20);
    });
  }

  // async function calculateRoute() {
  //   if (!originRef.current || destinationRef.current.value === "") {
  //     return;
  //   }

  //   // Get the origin and destination
  //   const origin = {
  //     lat: originRef.current.lat,
  //     lng: originRef.current.lng,
  //   };

  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: origin,
  //     destination: destinationRef.current.value,
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   });
  //   if (results) {
  //     setDirectionsResponse(results);
  //     setDistance(results.routes[0].legs[0].distance.text);
  //     setDuration(results.routes[0].legs[0].duration.text);
  //   } else {
  //     alert("Error in calculating route");
  //   }
  // }

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
                  ? "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  : "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",

                // {
                //     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                //     scaledSize: new window.google.maps.Size(30, 30),
                //   },
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
            <Button colorScheme="pink" type="submit" onClick={findCarpark}>
              Find Carpark
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
            onClick={myLocation}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default Gmap;
