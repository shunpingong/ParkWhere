const GenerateDirectionsLink = (destLat, destLng, originLat, originLng) => {
  const confirmed = window.confirm(
    "Are you sure you want to navigate to this car park?"
  );

  if (confirmed) {
    if (navigator.geolocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
      window.open(url, "_blank");
    } else {
      console.error("Geolocation data not available yet.");
    }
  }
};

export { GenerateDirectionsLink };
