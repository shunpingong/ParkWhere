/**
 * Reads the favorite car parks for the current user login.
 * Retrieves the list of favorite car parks associated with the user's ID from DB
 * @function readFavouriteCarparks
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of
 * favorite car park objects belonging to the current user. Each object contains
 * details about a favorite car park, such as its name, location, etc.
 */
const readFavouriteCarparks = () => {};

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
const writeFavouriteCarparks = (favoriteCarparks) => {};
