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
          resolve([]);
        }
      })
      .catch((error) => {
        console.log("Failed to fetch data:", error);
        reject(error);
      });
  });
};

/**
 * Adds a car park to the user's favourite car parks list.
 * @function addFavouriteCarpark
 * @param {Array<Object>} carParks - An array of favorite car park objects
 * representing the user's current favourite car parks.
 * @param {Object} carPark - The car park object to be added to the favourite
 * car parks list.
 * @returns {void} No return value.
 */
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

/**
 * Removes a car park from the user's favourite car parks list.
 * @function removeFavouriteCarpark
 * @param {Array<Object>} carParks - An array of favorite car park objects
 * representing the user's current favourite car parks.
 * @param {Object} carPark - The car park object to be removed from the favourite
 * car parks list.
 * @returns {void} No return value.
 */
const removeFavouriteCarpark = (carParks, carPark) => {
  const confirmed = window.confirm(
    "Are you sure you want to remove this car park?"
  );
  if (confirmed) {
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
  }
};

/**
 * Renames a car park in the user's favourite car parks list.
 * @function renameFavouriteCarpark
 * @param {Array<Object>} carParks - An array of favorite car park objects
 * representing the user's current favourite car parks.
 * @param {Object} carPark - The car park object to be renamed.
 * @param {string} newCarparkName - The new name for the car park.
 * @returns {void} No return value.
 */
const renameFavouriteCarpark = (carParks, carPark, newCarparkName) => {
  const uid = auth.currentUser.uid;
  const carparkID = carParks.indexOf(carPark);
  if (newCarparkName && carparkID !== -1) {
    // If the user entered a name and the carparkID is valid
    const carparkRef = ref(db, `users/${uid}/favouriteCarpark/${carparkID}`);
    update(carparkRef, {
      name: newCarparkName,
    })
      .then(() => {
        const updatedCarParks = [...carParks];
        updatedCarParks[carparkID].name = newCarparkName;
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
