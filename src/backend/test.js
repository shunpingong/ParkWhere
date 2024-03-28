const jsonData = [
  {
    lotsAvailable: "0",
    lotType: "M",
    carparkNo: "N0006",
    geometries: [
      {
        coordinates: "28956.4609, 29088.2522",
      },
    ],
  },
  {
    lotsAvailable: "2",
    lotType: "M",
    carparkNo: "S0108",
    geometries: [
      {
        coordinates: "29930.895, 33440.7746",
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <MapContainer data={jsonData} />
    </div>
  );
}

export { App };

class MapContainer extends Component {
  render() {
    const { data } = this.props;

    return (
      <Map
        google={this.props.google}
        zoom={10}
        initialCenter={{ lat: 1.3521, lng: 103.8198 }} // Set the initial center of the map
      >
        {data.map((item) => {
          const { lat, lng } = convertSVY21ToLatLng(
            item.geometries[0]?.coordinates
          );
          return (
            <Marker
              key={item.carparkNo}
              position={{ lat, lng }}
              title={item.carparkNo}
            />
          );
        })}
      </Map>
    );
  }
}

export default MapContainer;

// export default GoogleApiWrapper({
//   apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
// })(MapContainer);

function convertSVY21ToLatLng(coordinates) {
  const [svy21N, svy21E] = coordinates.split(",").map(Number);
  const converter = new SVY21();
  const { lat, lon } = converter.computeLatLon(svy21N, svy21E);
  return { lat, lng: lon };
}
// Compare this snippet from src/components/MapContainer.js:
