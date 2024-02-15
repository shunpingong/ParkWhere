import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, get, set, update } from 'firebase/database';
import { db } from "./firebase";

const readCurrentUserData = () => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User authenticated");
                resolve(user.uid);
            } else {
                console.log("User not authenticated");
                reject(new Error("User not authenticated"));
            }
            // Don't forget to unsubscribe when done.
            unsubscribe();
        });
    });
};

// For new sign-ups and updating of balance
const writePlayerData = async (
    email,
    balance,
    deck,
    isNew = true
) => {
    const auth = getAuth();

    try {
        const user = await readCurrentUserData();

        const dataLocation = "players";
        const reference = ref(db, `${dataLocation}/${user}/`);

        const snapshot = await get(reference);

        if (snapshot.exists() && isNew) {
            console.log("Invalid id: id already exists in Data");
            // You can handle this case as needed, e.g., throw an error
            throw new Error("Invalid id: id already exists in Data");
        } else {
            console.log("NEW writePlayerData");
            if (isNew) {
                await set(ref(db, `${dataLocation}/${user}/`), {
                    email,
                    balance: 1000,
                    deck,
                });
            } else {
                // We update instead
                await update(ref(db, `players/${user}/`), {
                    email,
                    balance,
                    deck,
                });
            }
            return user; // Return user.uid on success
        }
    } catch (error) {
        console.error("Error:", error.message);
        // Handle the error as needed
        throw error;
    }
};

export {
    writePlayerData
};