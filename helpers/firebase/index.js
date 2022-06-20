import { getApp, getApps, initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

if (!!!getApps() || !getApps()) {
    initializeApp({
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
    getApp(); // if already initialized, use that one
}

export const loginWithGoogleAndGetIdToken = async () => {
    try {
        const googleAuthProvider = new GoogleAuthProvider();
        googleAuthProvider.addScope("email");
        await signInWithPopup(getAuth(getApp()), googleAuthProvider);
        const token = await getAuth(getApp()).currentUser.getIdToken(true);
        return { token };
    } catch (error) {
        return { error };
    }
};

export const loginWithFacebookAndGetIdToken = async () => {
    try {
        const facebookAuthProvider = new FacebookAuthProvider();
        facebookAuthProvider.addScope("public_profile");
        facebookAuthProvider.addScope("email");
        facebookAuthProvider.setCustomParameters({
            auth_type: "rerequest",
        });
        const result = await signInWithPopup(getAuth(getApp()), facebookAuthProvider);
        const token = await getAuth(getApp()).currentUser.getIdToken(true);
        return { token, email: result.user.email };
    } catch (error) {
        return { error };
    }
};
// a
