import firebase from "firebase";

if (!!!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY, // Auth / General Use
        // apiKey: "AIzaSyA-ltZYFj5XA3oldGyjQ1ufxONNcdng7IA",
        authDomain: "letscook-001.firebaseapp.com",
        projectId: "letscook-001",
        storageBucket: "letscook-001.appspot.com",
        messagingSenderId: "859787193343",
        appId: "1:859787193343:web:47f3d5d70f015f051b15ca",
        measurementId: "G-H8MH6HPP8X",
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
