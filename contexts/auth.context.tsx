import React, { createContext, useState, useEffect, useContext } from "react";
import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import { GoogleAuthProvider, User, getAuth, getRedirectResult, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/router";
import { loginWithSocialMedia } from "helpers/serverRequests/customer";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "@hooks";
import cookies from "js-cookie";
import { useAuthStore, useUserInfoStore } from "@stores";
import { subscribeToMailingListGroup, updateSubscriber } from "helpers/serverRequests/mailingList";
import { MAILERLITE_MAILING_LIST_GROUP } from "constants/constants";
// import * as Sentry from "@sentry/browser";

// Configuración de Firebase
const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    authDomain: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN,
    projectId: "letscook-001",
    storageBucket: "letscook-001.appspot.com",
    messagingSenderId: "859787193343",
    appId: "1:859787193343:web:47f3d5d70f015f051b15ca",
    measurementId: "G-H8MH6HPP8X",
};

var firebaseApp: FirebaseApp;
firebaseApp = initializeApp(firebaseConfig, "DEFAULT");

interface AuthContextProps {
    isVerifyingAuth: boolean;
    user: User | null;
    signInWithGoogle: (callback?: () => void) => void;
    isCheckingRedirect: boolean;
    setIsCheckingRedirect: (isCheckingRedirect: boolean) => void;
    handleLoginRedirect: (redirectTo: string, callback?: () => void) => void;
}

const AuthContext = createContext<AuthContextProps>({
    isVerifyingAuth: true,
    user: null,
    signInWithGoogle: () => {},
    isCheckingRedirect: true,
    setIsCheckingRedirect: (isCheckingRedirect: boolean) => {},
    handleLoginRedirect: (redirectTo: string, callback?: () => void) => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: any }> = ({ children }: { children: any }) => {
    const [isVerifyingAuth, setVerifyingAuth] = useState(true);
    const [isCheckingRedirect, setIsCheckingRedirect] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const { push, locale } = useRouter();
    const [serverError, setserverError] = useState("");
    const { saveInLocalStorage } = useLocalStorage();
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        provider.addScope("https://www.googleapis.com/auth/plus.login");

        signInWithRedirect(getAuth(firebaseApp), provider);
    };

    const saveLoginData = (token, userInfo, callback?: () => void) => {
        saveInLocalStorage(LOCAL_STORAGE_KEYS.token, token);
        saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, userInfo);
        setUserInfo(userInfo);
        subscribeToMailerLite(userInfo.email, userInfo.id, true);
        cookies.set(LOCAL_STORAGE_KEYS.token, token);
        setIsAuthenticated(true);
        //@ts-ignore
        if (callback) callback(userInfo);
    };

    const subscribeToMailerLite = (email: string, userId: string, acceptsMarketing: boolean) => {
        subscribeToMailingListGroup(MAILERLITE_MAILING_LIST_GROUP, email, undefined).then((res) =>
            updateSubscriber(email, {
                shopify_accepts_marketing: acceptsMarketing ? 1 : 0,
                shopify_id: userId,
                language: locale === "es" ? "esp" : locale === "en" ? "ing" : "cat",
            })
        );
    };

    const handleUserLoggedIm = async (accessToken: string, email: string, callback?: () => void) => {
        const res = await loginWithSocialMedia(accessToken, email, false); //TODO: CHange it

        if (res.status === 200) {
            saveLoginData(res.data.token, res.data.userInfo, callback);
        } else {
            setserverError(res.data.message);
        }
    };

    const handleLoginRedirect = async (redirectTo: string, callback?: () => void) => {
        try {
            const result = await getRedirectResult(getAuth(firebaseApp));
            if (result?.user) {
                const { user } = result;
                const accessToken = await user.getIdToken();

                await handleUserLoggedIm(accessToken, user.email, callback);
                const url = new URL(redirectTo);
                const pathname = url.pathname;
                const searchParams = new URLSearchParams(url.search);
                const query = Object.fromEntries(searchParams.entries());
                await push({ pathname, query });
                setIsCheckingRedirect(false);
            } else {
                setIsCheckingRedirect(false);
            }
        } catch (error) {
            setIsCheckingRedirect(false);
        }
    };
    const value = {
        isVerifyingAuth,
        user,
        signInWithGoogle,
        isCheckingRedirect,
        handleLoginRedirect,
        setIsCheckingRedirect,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
