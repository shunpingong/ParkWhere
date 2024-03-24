// import React, { useEffect, useState } from "react";

// const Location = ({ children }) => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setLatitude(latitude);
//         setLongitude(longitude);
//       });
//     } else {
//       console.error(`Your browser doesn't support Geolocation`);
//     }
//   }, []);

//   return (
//     <div>
//       {latitude && longitude && (
//         <div>
//           Latitude: {latitude}
//           <br />
//           Longitude: {longitude}
//         </div>
//       )}
//       {children} {/* Render children regardless of geolocation availability */}
//     </div>
//   );
// };

// export default Location;
