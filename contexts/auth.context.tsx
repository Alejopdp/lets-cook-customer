import React, { createContext, useState, useEffect, useContext } from 'react';
import {   initializeApp, FirebaseApp } from 'firebase/app';
import {GoogleAuthProvider, User, getAuth, getRedirectResult, onAuthStateChanged, signInWithRedirect} from 'firebase/auth';
import { useRouter } from 'next/router';
import { loginWithSocialMedia } from 'helpers/serverRequests/customer';
import { LOCAL_STORAGE_KEYS, useLocalStorage } from '@hooks';
import cookies from "js-cookie";
import { useAuthStore, useUserInfoStore } from '@stores';
import { Routes, localeRoutes } from 'lang/routes/routes';



// Configuración de Firebase  
const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY, // Auth / General Use
        authDomain: "letscook-001.firebaseapp.com",
        projectId: "letscook-001",
        storageBucket: "letscook-001.appspot.com",
        messagingSenderId: "859787193343",
        appId: "1:859787193343:web:47f3d5d70f015f051b15ca",
        measurementId: "G-H8MH6HPP8X",

};

var firebaseApp: FirebaseApp
firebaseApp = initializeApp(firebaseConfig, "DEFAULT")

const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

interface AuthContextProps {
  isVerifyingAuth: boolean;
  user: User | null;
  signInWithGoogle: () => void;
  isCheckingRedirect: boolean,
  handleLoginRedirect: (redirectTo: string) => void

}

const AuthContext = createContext<AuthContextProps>({
  isVerifyingAuth: true,
  user: null,
  signInWithGoogle: () => {},
  isCheckingRedirect: true,
  handleLoginRedirect: (handleLoginRedirect: string) => {}
});

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{children: any}> = ({ children }: {children: any}) => {
  const [isVerifyingAuth, setVerifyingAuth] = useState(true);
  const [isCheckingRedirect, setIsCheckingRedirect] = useState(true)
  const [user, setUser] = useState<User | null>(null);
  const {query, push, locale} = useRouter()
  const [serverError, setserverError] = useState("");
  const { saveInLocalStorage } = useLocalStorage();
  const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const signInWithGoogle = () => {
   signInWithRedirect(getAuth(firebaseApp), provider);
  };

  const saveLoginData = (token, userInfo) => {
    saveInLocalStorage(LOCAL_STORAGE_KEYS.token, token);
    saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, userInfo);
    setUserInfo(userInfo);
    cookies.set(LOCAL_STORAGE_KEYS.token, token);
    setIsAuthenticated(true);
    // props.redirect ? push(localeRoutes[locale][Routes.perfil]) : "";
    // props.handleLogin ? props.handleLogin(userInfo) : "";
};

  const handleUserLoggedIm = async (accessToken: string, email: string) => {
    const res = await loginWithSocialMedia(accessToken, email, false); //TODO: CHange it 

    if (res.status === 200) {
        saveLoginData(res.data.token, res.data.userInfo);
      } else {
        setserverError(res.data.message);
      }
    }
    
    const handleLoginRedirect = async (redirectTo: string) => {
      
      const result = await getRedirectResult(getAuth(firebaseApp))
      if (result?.user) {
        const { user } = result;
        const accessToken = await user.getIdToken()
        
        console.log("Access token: ", accessToken)
        await handleUserLoggedIm(accessToken, user.email)
        await push(redirectTo)
        setIsCheckingRedirect(false)

  } else {
      setIsCheckingRedirect(false)
  }
}

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const user = getAuth(firebaseApp)?.currentUser;

  //     if (user) {
  //       setUser(user);
  //       console.log("User already signed in")
  //       const accessToken = await user.getIdToken(true)
  //       await handleUserLoggedIm(accessToken, user.email)
  //       await push(query?.redirect as string ?? "/")
  //       setVerifyingAuth(false)
  //     }

  //     else {
  //       getRedirectResult(getAuth(firebaseApp))
  //       .then(async (result) => {
  //          if (result === null) {
  //         setVerifyingAuth(false)
  //           return
  //         }
  //          const accesToken = await result?.user.getIdToken(true)
  //         if (accesToken) {
  //           const user = result.user;
  //           setUser(user);


  //           if (query.redirect) {
  //             push(query.redirect as string ?? "/")
  //           }
  //         }

  //         else {
  //           // El usuario que inició sesión
  //           alert("Error al obtener ID token")
            
  //         }
  //         setVerifyingAuth(false)
  //       }).catch((error) => {
  //         alert(error.message);
  //         setVerifyingAuth(false)
  //       });
  
  //     }
  //   }

  //   if (!getAuth(firebaseApp)) return
  //   console.log("Ther is auth")
    
  //   const unsubscribe = onAuthStateChanged(getAuth(firebaseApp), (user) => {
  //   checkAuth()
  //   });

  //   return () => unsubscribe()

  // }, [getAuth(firebaseApp)]);

  const value = {
    isVerifyingAuth,
    user,
    signInWithGoogle,
    isCheckingRedirect,
    handleLoginRedirect

  };

  return (
    <AuthContext.Provider value={value}>
    {children}
</AuthContext.Provider>
  )}

  export { AuthProvider, useAuth };
