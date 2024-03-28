import { db, auth } from "./firebase";
import { ref, set, get, push, update, remove } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

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
          console.log(favouriteCarparks);
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
const writeFavouriteCarparks = (favouriteCarparks) => {
  var uid = getUID();
  const dataLocation = "users";
  const reference = ref(db, `${dataLocation}/${uid}/`);

  set(ref(db, `${dataLocation}/${uid}/`), {
    favouriteCarpark: favouriteCarparks,
  });
};

// Adds 1 carpark into database (parameters: A DICTIONARY eg: {lat: 1.3443944759713704,lng: 103.68037761231732})
const addFavouriteCarparks = (element) => {
  var uid = getUID();
  const dataLocation = "users";
  const reference = ref(db, `${dataLocation}/${uid}`);
  readFavouriteCarparks()
    .then((favouriteCarparksArray) => {
      favouriteCarparksArray.push(element);
      writeFavouriteCarparks(favouriteCarparksArray);
    })
    .catch((error) => {
      console.error("Error fetching favourite carparks:", error);
    });
};

// Removes 1 carpark from database (parameters: A DICTIONARY eg: {lat: 1.3443944759713704,lng: 103.68037761231732})
const removeFavouriteCarparks = (element) => {
  var uid = getUID();
  const dataLocation = "users";
  const reference = ref(db, `${dataLocation}/${uid}`);
  readFavouriteCarparks()
    .then((favouriteCarparksArray) => {
      // find the index of the element and remove by 1
      favouriteCarparksArray.splice(favouriteCarparksArray.indexOf(element), 1);
      writeFavouriteCarparks(favouriteCarparksArray);
    })
    .catch((error) => {
      console.error("Error fetching favourite carparks:", error);
    });
};

export { readFavouriteCarparks, addFavouriteCarparks, removeFavouriteCarparks };
