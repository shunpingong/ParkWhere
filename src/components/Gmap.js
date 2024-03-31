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
import { readFavouriteCarparks } from "../backend/command";
import { FindCoordinates } from "../components/FindCoordinates";
import { addFavouriteCarpark } from "../backend/command";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { red, green, blue } from "@mui/material/colors";
import MoneyIcon from "@mui/icons-material/Money";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsIcon from "@mui/icons-material/Directions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { CarparkData } from "../backend/CarparkData";
import * as geolib from "geolib";

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
    // setCarparkList(CarparkData());
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
  const destinationRef = useRef();

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

  async function calculateRoute(lat, lng) {
    if (originLat === null || originLng === null) {
      alert("Please enable geolocation to use this feature");
      return;
    }

    const origin = { lat: originLat, lng: originLng };

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: { lat: lat, lng: lng },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    if (results) {
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
    setCenter(center);
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
          {/** Render markers for carparks that are in the favourite list */}
          {favorite.map((carpark) => (
            <MarkerF
              key={carpark.cpID}
              position={carpark}
              options={{
                icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
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

            // Check if the car park is not in the favorite list and is within 2km from the center position
            const shouldRender =
              !favorite?.some(
                (favoriteCarpark) =>
                  favoriteCarpark.lat === carpark.lat &&
                  favoriteCarpark.lng === carpark.lng
              ) && within2km;

            // Render the car park marker if it meets the criteria
            if (shouldRender) {
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
              onClick={[
                calculateRoute(selectedCarpark.lat, selectedCarpark.lng),
              ]}
              position={selectedCarpark}
              onCloseClick={() => setSelectedCarpark(null)}
              shouldFocus={true}
            >
              <Box
                sx={{
                  // width: "auto",
                  // height: "auto",
                  // border: "1px groove black",
                  bgcolor: "blue",
                  "&:hover": {
                    bgcolor: "red",
                  },
                }}
              >
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                      {selectedCarpark.name}
                    </Typography>
                    <Grid
                      container
                      alignItems="center"
                      spacing={1}
                      sx={{ mt: 1 }}
                    >
                      <Grid item>
                        <LocationOnIcon
                          sx={{ color: red[500], fontSize: 20 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontSize={16}>
                          <strong>Address:</strong> {selectedCarpark.address}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <CompareArrowsIcon sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontSize={16}>
                          <strong>Estimated Distance:</strong> {distance}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <AccessTimeIcon sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontSize={16}>
                          <strong>Estimated Duration:</strong> {duration}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <LocalParkingIcon
                          sx={{ color: red[500], fontSize: 20 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          fontSize={16}
                          sx={{
                            color:
                              selectedCarpark.availableLots < 10
                                ? "red"
                                : "black",
                          }}
                        >
                          <strong>Lots Available:</strong>{" "}
                          {selectedCarpark.availableLots}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <DriveEtaIcon sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontSize={16}>
                          <strong>Mode:</strong> Driving
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <MoneyIcon sx={{ color: green[500], fontSize: 20 }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontSize={16}>
                          <strong>Weekday:</strong> $
                          {selectedCarpark.weekdayRate} /{" "}
                          {selectedCarpark.weekdayMin}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <MoneyIcon sx={{ color: green[500], fontSize: 20 }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontSize={16}>
                          <strong>Sat:</strong> ${selectedCarpark.satdayRate} /{" "}
                          {selectedCarpark.satdayMin}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <MoneyIcon sx={{ color: green[500], fontSize: 20 }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontSize={16}>
                          <strong>Sun/PH:</strong> ${selectedCarpark.sunPHRate}{" "}
                          / {selectedCarpark.sunPHMin}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <AccessTimeIcon
                          sx={{ color: blue[500], fontSize: 20 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" fontSize={16}>
                          <strong>Start Time:</strong>{" "}
                          {selectedCarpark.startTime}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <AccessTimeIcon
                          sx={{ color: blue[500], fontSize: 20 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" fontSize={16}>
                          <strong>End Time:</strong> {selectedCarpark.endTime}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-end">
                      <IconButton
                        onClick={() =>
                          generateDirectionsLink(
                            selectedCarpark.lat,
                            selectedCarpark.lng
                          )
                        }
                      >
                        <DirectionsIcon
                          sx={{ color: blue[500], fontSize: 32 }}
                        />
                      </IconButton>

                      <IconButton
                        onClick={() =>
                          addFavouriteCarpark(favorite, selectedCarpark)
                        }
                        sx={{ color: "red" }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </InfoWindow>
          )}

          {/* {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )} */}
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
