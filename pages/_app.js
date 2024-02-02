// External components
import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import useLocalStorage, { LOCAL_STORAGE_KEYS } from "../hooks/useLocalStorage/localStorage";
import { useAuthStore, useUserInfoStore } from "../stores/auth";
import { AuthProvider, useAuth } from "../contexts/auth.context";
import { useCookiesStore } from "../stores/cookies";
import { getCustomerById, verifyToken } from "../helpers/serverRequests/customer";
import { loadStripe } from "@stripe/stripe-js";
import { SnackbarProvider } from "notistack";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import * as ga from "../helpers/ga";
import CookiesDialog from "../components/molecules/cookiesPolicies/cookiesDialog";
import TagManager from "react-gtm-module";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export function reportWebVitals(metric) {
    switch (metric.name) {
        case "FCP":
            console.log("FCP: ", metric);
            break;
        case "LCP":
            console.log("LCP: ", metric);

            break;
        case "CLS":
            console.log("CLS: ", metric);

            break;
        case "FID":
            console.log("FID: ", metric);

            break;
        case "TTFB":
            console.log("TTFB: ", metric);
            break;
        default:
            break;
    }
}

function MyApp(props) {
    const { Component, pageProps } = props;
    const { getFromLocalStorage, saveInLocalStorage, removeFromLocalStorage } = useLocalStorage();
    const [isLoading, setisLoading] = useState(true);
    const { setUserInfo, userInfo } = useUserInfoStore((state) => ({ setUserInfo: state.setuserInfo, userInfo: state.userInfo }));

    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const { hasAcceptedCookies, setHasAccepteCookies } = useCookiesStore((state) => ({
        hasAcceptedCookies: state.hasAcceptedCookies,
        setHasAccepteCookies: state.setHasAcceptedCookies,
    }));
    const router = useRouter();
    const { setVerifyingAuth } = useAuth();

    useEffect(() => {
        const verifyAuthentication = async () => {
            const token = await getFromLocalStorage(LOCAL_STORAGE_KEYS.token);
            const hasAcceptedCookies = await getFromLocalStorage(LOCAL_STORAGE_KEYS.HAS_ACCEPTED_COOKIES);
            setHasAccepteCookies(hasAcceptedCookies);

            if (!token) {
                console.log({ token });
                setVerifyingAuth(false);
                setisLoading(false);
                TagManager.initialize({ gtmId: "GTM-5M7F3L5", dataLayer: { test: "ale" } });
                return;
            }
            const res = await verifyToken(token);
            if (res.status === 200) {
                setIsAuthenticated(true);
                const userInfo = await getFromLocalStorage(LOCAL_STORAGE_KEYS.userInfo);
                const getCustomerRes = await getCustomerById(userInfo?.id, router.locale);
                TagManager.initialize({ gtmId: "GTM-5M7F3L5", dataLayer: { id: getCustomerRes.data.id, test: "ale" } });

                if (getCustomerRes && getCustomerRes.status === 200) {
                    userInfo = {
                        email: getCustomerRes.data.email,
                        phone1: getCustomerRes.data.phone1,
                        phone2: getCustomerRes.data.phone2,
                        paymentMethods: getCustomerRes.data.paymentMethods,
                        preferredLanguage: getCustomerRes.data.preferredLanguage,
                        firstName: getCustomerRes.data.firstName,
                        lastName: getCustomerRes.data.lastName,
                        id: getCustomerRes.data.id,
                        shippingAddress: getCustomerRes.data.shippingAddress,
                        wallet: getCustomerRes.data.wallet,
                    };

                    if (userInfo.shippingAddress.name) userInfo.shippingAddress.addressName = userInfo.shippingAddress.name;
                    if (userInfo.shippingAddress.details) userInfo.shippingAddress.addressDetails = userInfo.shippingAddress.details;
                }
                setUserInfo(userInfo);
                saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, userInfo);
            } else {
                TagManager.initialize({ gtmId: "GTM-5M7F3L5", dataLayer: { test: "ale" } });
                removeFromLocalStorage(LOCAL_STORAGE_KEYS.token);
                removeFromLocalStorage(LOCAL_STORAGE_KEYS.userInfo);
            }

            setVerifyingAuth(false);
            setisLoading(false);
        };
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        verifyAuthentication();
    }, []);

    useEffect(() => {
        const handleRouteChange = (url) => {
            // ga.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <React.Fragment>
            <Head>
                <meta
                    name="description"
                    content="Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana."
                />
                <meta property="og:site_name" content="LetsCook: Productos frescos y recetas" />
                <meta property="og:image" content="https://i.ibb.co/s31H9Lz/logo-Letscook.jpg" />
                <meta
                    property="og:description"
                    content="Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana."
                />
                <meta property="og:url" content="https://letscooknow.es/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="LetsCook: Productos frescos y recetas" />
                <meta
                    name="twitter:description"
                    content="Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana."
                />
                <link rel="icon" href="/favicon.png" />
                <link rel="preload" href="/fonts/avenirNextLtPro/AvenirNextLTPro-Regular.otf" as="font" crossOrigin="" />
                <link rel="preload" href="/fonts/avenirNextLtPro/AvenirNextLTPro-Medium.otf" as="font" crossOrigin="" />
                <link rel="preload" href="/fonts/avenirNextLtPro/AvenirNextLTPro-Bold.otf" as="font" crossOrigin="" />
                <link rel="preload" as="image" href="/assets/home/home-principal-desktop.webp" type="image/webp"></link>
                <link rel="preload" as="image" href="/assets/home/home-principal-mobile.webp" type="image/webp"></link>
            </Head>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <Elements stripe={stripePromise}>
                        <CssBaseline />
                        <AuthProvider>
                            <Component {...pageProps} />
                            {!isLoading && (
                                <>
                                    <Script src="https://www.googletagmanager.com/gtag/js?id=G-E4N3ER3H0G" strategy="afterInteractive" />
                                    <Script id="google-analytics-script" strategy="afterInteractive">
                                        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-E4N3ER3H0G', { 'debug_mode': true, 'user_id': '${userInfo?.email}' });
        `}
                                    </Script>
                                </>
                            )}
                        </AuthProvider>
                        {/* {!isLoading && <Component {...pageProps} />} */}
                    </Elements>
                </SnackbarProvider>
                {!isLoading && !hasAcceptedCookies && <CookiesDialog />}
            </ThemeProvider>
        </React.Fragment>
    );
}

export default MyApp;
