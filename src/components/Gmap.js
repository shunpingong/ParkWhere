import React from 'react';
import { GoogleMap, useLoadScript, MarkerF , Autocomplete} from '@react-google-maps/api';
import Searchbar from './Searchbar';

const mapContainerStyle = {
  width: '80%',
  height: '80vh',
  margin: 'auto',
};

const center = {
  lat: 1.3443944759713704, // default latitude
  lng: 103.68037761231732, // default longitude
};

const Gmap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ['places'],
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options ={
          {
            scrollwheel: true,
            mapTypeControl: false
          }
        }
        mapTypeId = 'roadmap'
      >
        <Searchbar />
        <MarkerF position={center} draggable ={true}/>
      </GoogleMap>
    </div>
  );
};

export default Gmap;