import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  Autocomplete,
  InfoWindow,
} from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
import {
  readFavouriteCarparks,
  removeFavouriteCarpark,
} from "../../backend/command";
import { FindCoordinates } from "./FindCoordinates";
import { addFavouriteCarpark } from "../../backend/command";
import { Grid } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import DirectionsIcon from "@mui/icons-material/Directions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { CarparkData } from "../../backend/CarparkData";
import * as geolib from "geolib";
import CarParkDetails from "../Carparks/CarParkDetails";
import CarParkRates from "../Carparks/CarParkRates";
import CarParkLots from "../Carparks/CarParkLots";

const mapContainerStyle = {
  width: "90%",
  height: "90vh",
  margin: "auto",
};

/**
 * A component for displaying the Google Maps component.
 * @component
 * @returns {JSX.Element} Gmap component.
 */
function Gmap() {
  const [center, setCenter] = useState();
  const [favorite, setFavorite] = useState([]);
  const [carparkList, setCarparkList] = useState([]);
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const [originLat, setOriginLat] = useState(null);
  const [originLng, setOriginLng] = useState(null);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const destinationRef = useRef();
  const [removed, setRemoved] = useState(null);

  function myLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setOriginLat(latitude);
          setOriginLng(longitude);
        },
        (error) => {
          console.error(`Error getting geolocation: ${error.message}`);
        }
      );
    } else {
      console.error(`Your browser doesn't support Geolocation`);
    }
  }

  const generateDirectionsLink = (destLat, destLng) => {
    const confirmed = window.confirm(
      "Are you sure you want to navigate to this car park?"
    );

    if (confirmed) {
      if (navigator.geolocation && center) {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
        window.open(url, "_blank");
      } else {
        console.error("Geolocation data not available yet.");
      }
    }
  };

  useEffect(() => {
    readFavouriteCarparks()
      .then((favouriteCarparks) => {
        setFavorite(favouriteCarparks);
      })
      .catch((error) => {
        console.error("Error fetching favourite carparks:", error);
      });
    myLocation();
    CarparkData().then((data) => {
      setCarparkList(data);
    });
  }, []);

  useEffect(() => {}, [removed]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>; // Render a loading indicator until the map is loaded and the location is retrieved
  }

  async function findCarpark() {
    if (destinationRef.current.value === "") {
      return;
    }
    FindCoordinates(destinationRef.current.value, (latitude, longitude) => {
      setCenter({ lat: latitude, lng: longitude });
      map.panTo(center);
      map.setZoom(15);
    });
  }

  function clearRoute() {
    setCenter(center);
    destinationRef.current.value = "";
  }

  function isFavourite(carpark) {
    return !favorite?.some(
      (favoriteCarpark) =>
        favoriteCarpark.lat === carpark.lat &&
        favoriteCarpark.lng === carpark.lng
    );
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
          {/** Render markers for carparks that are in the favourite list */}
          {favorite.map((carpark) => (
            <MarkerF
              key={carpark.cpID}
              position={carpark}
              options={{
                icon: {
                  url: "https://cdn-icons-png.flaticon.com/512/4340/4340223.png",
                  scaledSize: new window.google.maps.Size(30, 30),
                },
              }}
              onClick={() => setSelectedCarpark(carpark)}
            />
          ))}

          {/** Render markers for carparks that are not in the favourite list */}
          {carparkList.map((carpark) => {
            // Calculate distance between the car park and the center position
            const distance = geolib.getDistance(
              { latitude: center.lat, longitude: center.lng },
              { latitude: carpark.lat, longitude: carpark.lng }
            );

            // Check if the distance is within 2km
            const within2km = distance <= 2000; // Assuming the distance is in meters

            // Render the car park marker if it meets the criteria
            if (isFavourite(carpark) && within2km) {
              return (
                <MarkerF
                  key={carpark.cpID}
                  position={carpark}
                  options={{
                    icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
                  }}
                  onClick={() => setSelectedCarpark(carpark)}
                />
              );
            } else {
              return null; // Do not render the car park marker
            }
          })}
          {selectedCarpark && (
            <InfoWindow
              maxWidth={"auto"}
              maxHeight={"auto"}
              position={selectedCarpark}
              onCloseClick={() => setSelectedCarpark(null)}
              shouldFocus={true}
            >
              <Box
                sx={{
                  p: 2,
                  m: 2,
                  width: "auto",
                  height: "auto",
                  borderRadius: "lg",
                  bgColor: "white",
                  shadow: "base",
                }}
              >
                <Grid container alignItems="center" sx={{ width: "auto" }}>
                  <CarParkDetails carPark={selectedCarpark} />
                  <CarParkLots carPark={selectedCarpark} />

                  <CarParkRates carPark={selectedCarpark} />

                  <Grid item xs={12} container justifyContent="flex-end">
                    <IconButton
                      onClick={() =>
                        generateDirectionsLink(
                          selectedCarpark.lat,
                          selectedCarpark.lng
                        )
                      }
                    >
                      <DirectionsIcon sx={{ color: blue[500], fontSize: 32 }} />
                    </IconButton>

                    {isFavourite(selectedCarpark) ? (
                      <IconButton
                        onClick={() => (
                          addFavouriteCarpark(favorite, selectedCarpark),
                          setRemoved(false)
                        )}
                        sx={{ color: green[500] }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => (
                          removeFavouriteCarpark(favorite, selectedCarpark),
                          setRemoved(true)
                        )}
                        sx={{ color: "red" }}
                      >
                        <HeartBrokenIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </InfoWindow>
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
              onSelect={findCarpark}
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
            <IconButton
              aria-label="center back"
              icon={<FaLocationArrow />}
              isRound
              onClick={myLocation}
            />
          </ButtonGroup>
        </HStack>
      </Box>
    </Flex>
  );
}

export default Gmap;
