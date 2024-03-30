import { db, auth } from "./firebase";
import { ref, set, get, update } from "firebase/database";

const getUID = () => {
  return auth.currentUser?.uid;
};

/**
 * Reads the favorite car parks for the current user login.
 * Retrieves the list of favorite car parks associated with the user's ID from DB
 * @function readFavouriteCarparks
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of
 * favorite car park objects belonging to the current user. Each object contains
 * details about a favorite car park, such as its name, location, etc.
 */
const readFavouriteCarparks = () => {
  return new Promise((resolve, reject) => {
    var uid = getUID();
    const dataLocation = "users";
    const reference = ref(db, `${dataLocation}/${uid}`);
    get(reference)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const favouriteCarparks = Object.values(
            snapshot.val()["favouriteCarpark"]
          );
          resolve(favouriteCarparks);
        } else {
          resolve([]); // Return an empty array if the data doesn't exist
        }
      })
      .catch((error) => {
        console.log("Failed to fetch data:", error);
        reject(error); // Reject the promise with the error
      });
  });
};

/**
 * Writes the favorite car parks for the current user to Firebase.
 * Saves the list of favorite car parks associated with the user's ID to DB
 * @function writeFavouriteCarparks
 * @param {Array<Object>} favoriteCarparks - An array of favorite car park
 * objects to be saved to Firebase. Each object should contain details about
 * a favorite car park, such as its name, location, etc.
 * @returns {Promise<void>} A promise that resolves when the favorite car parks
 * have been successfully written to Firebase.
 */

// const writeFavouriteCarparks = (favouriteCarparks) => {
//   var uid = getUID();
//   const dataLocation = "users";

//   //   try {
//   //     const user = await readCurrentUserData();
//   set(ref(db, `${dataLocation}/${uid}/`), {
//     favouriteCarpark: favouriteCarparks,
//   });
// };

// Adds 1 carpark into database (parameters: A DICTIONARY eg: {lat: 1.3443944759713704,lng: 103.68037761231732})
// const addFavouriteCarpark = (element) => {
//   // var uid = getUID();
//   // const dataLocation = "users";
//   // const reference = ref(db, `${dataLocation}/${uid}`);
//   readFavouriteCarparks()
//     .then((favouriteCarparksArray) => {
//       favouriteCarparksArray.push(element);
//       writeFavouriteCarparks(favouriteCarparksArray);
//     })
//     .catch((error) => {
//       console.error("Error fetching favourite carparks:", error);
//     });
// };

const addFavouriteCarpark = (carParks, carPark) => {
  const confirmed = window.confirm(
    "Are you sure you want to add this car park?"
  );
  if (confirmed) {
    const uid = auth.currentUser.uid;
    const carparkID = carParks.indexOf(carPark);
    if (carparkID === -1) {
      // If the carparkID is invalid
      carParks.push(carPark);
      const carparkRef = ref(db, `users/${uid}/`);
      const updatedCarParks = [...carParks];
      set(carparkRef, {
        favouriteCarpark: updatedCarParks,
      });
      alert("Carpark added successfully!");
    } else {
      alert("Carpark already favourited.");
    }
  }
};

// Removes 1 carpark from database (parameters: A DICTIONARY eg: {lat: 1.3443944759713704,lng: 103.68037761231732})
const removeFavouriteCarpark = (carParks, carPark) => {
  const uid = auth.currentUser.uid;
  const carparkID = carParks.indexOf(carPark);
  if (carparkID !== -1) {
    // If the carparkID is valid
    carParks.splice(carparkID, 1);
    const carparkRef = ref(db, `users/${uid}/`);
    const updatedCarParks = [...carParks];
    set(carparkRef, {
      favouriteCarpark: updatedCarParks,
    });
    alert("Carpark removed successfully!");
  } else {
    console.error("Invalid carpark ID.");
    return -1;
  }
};

const renameFavouriteCarpark = (carParks, carPark, newCarparkName) => {
  const uid = auth.currentUser.uid;
  const carparkID = carParks.indexOf(carPark);
  if (newCarparkName && carparkID !== -1) {
    // If the user entered a name and the carparkID is valid
    const carparkRef = ref(db, `users/${uid}/favouriteCarpark/${carparkID}`);
    update(carparkRef, {
      cpID: newCarparkName,
    })
      .then(() => {
        const updatedCarParks = [...carParks];
        updatedCarParks[carparkID].cpID = newCarparkName;
        alert("Carpark name updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating carpark name:", error);
        alert(
          "An error occurred while updating carpark name. Please try again."
        );
      });
  } else {
    console.error("Invalid carpark ID or no name entered.");
    return -1;
  }
};

export {
  readFavouriteCarparks,
  addFavouriteCarpark,
  removeFavouriteCarpark,
  renameFavouriteCarpark,
};
