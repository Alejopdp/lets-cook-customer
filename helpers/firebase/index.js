import firebase from "firebase";

if (!!!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY, // Auth / General Use
        authDomain: "lets-cook-c282e.firebaseapp.com",
        projectId: "lets-cook-c282e",
        storageBucket: "lets-cook-c282e.appspot.com",
        messagingSenderId: "804652515169",
        appId: "1:804652515169:web:4f322cd02156c08ad48f20",
        measurementId: "G-B0WMSRWW1P",
    });
} else {
    firebase.app(); // if already initialized, use that one
}

export const loginWithGoogleAndGetIdToken = async () => {
    try {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        googleAuthProvider.addScope("email");
        await firebase.auth().signInWithPopup(googleAuthProvider);
        const token = await firebase.auth().currentUser.getIdToken(true);

        return token;
    } catch (error) {
        return undefined;
    }
};

export const loginWithFacebookAndGetIdToken = async () => {
    try {
        const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
        await firebase.auth().signInWithPopup(facebookAuthProvider);
        const token = await firebase.auth().currentUser.getIdToken(true);

        return token;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};
