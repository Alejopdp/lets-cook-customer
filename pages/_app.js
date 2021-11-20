// External components
import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import useLocalStorage from "../hooks/useLocalStorage/localStorage";
import cookies from "js-cookie";
import { useAuthStore, useUserInfoStore } from "../stores/auth";
import { useCookiesStore } from "../stores/cookies";
import { verifyToken } from "../helpers/serverRequests/customer";
import { loadStripe } from "@stripe/stripe-js";
import { SnackbarProvider } from "notistack";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import * as ga from "../helpers/ga";
import CookiesDialog from "../components/molecules/cookiesPolicies/cookiesDialog";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function MyApp(props) {
    const { Component, pageProps } = props;
    const { getFromLocalStorage, resetLocalStorage } = useLocalStorage();
    const [isLoading, setisLoading] = useState(true);
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const hasAcceptedCookies = useCookiesStore((state) => state.hasAcceptedCookies);
    const router = useRouter();

    useEffect(() => {
        const verifyAuthentication = async () => {
            const token = await getFromLocalStorage("token");
            if (!token) {
                setisLoading(false);
                return;
            }
            const res = await verifyToken(token);
            if (res.status === 200) {
                setIsAuthenticated(true);
                const userInfo = getFromLocalStorage("userInfo");
                setUserInfo(userInfo);
            } else {
                resetLocalStorage();
            }
            setisLoading(false);
        };
        verifyAuthentication();
    }, []);

    useEffect(() => {
        const handleRouteChange = (url) => {
            ga.pageview(url);
        };
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on("routeChangeComplete", handleRouteChange);

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <React.Fragment>
            <Head>
                <title>Let's cook: Productos frescos y recetas</title>
                <meta
                    name="description"
                    content="Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana."
                />
                <meta property="og:site_name" content="Let's cook: Productos frescos y recetas" />
                <meta property="og:image" content="https://i.ibb.co/s31H9Lz/logo-Letscook.jpg" />
                <meta property="og:title" content="Let's cook: Productos frescos y recetas" />
                <meta
                    property="og:description"
                    content="Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana."
                />
                <meta property="og:url" content="https://letscooknow.es/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Let's cook: Productos frescos y recetas" />
                <meta
                    name="twitter:description"
                    content="Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana."
                />
                <link rel="icon" href="/favicon.png" />
                <link rel="preload" href="/fonts/avenirNextLtPro/AvenirNextLTPro-Regular.otf" as="font" crossOrigin="" />
                <link rel="preload" href="/fonts/avenirNextLtPro/AvenirNextLTPro-Medium.otf" as="font" crossOrigin="" />
                <link rel="preload" href="/fonts/avenirNextLtPro/AvenirNextLTPro-Bold.otf" as="font" crossOrigin="" />
            </Head>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <Elements stripe={stripePromise}>
                        <CssBaseline />
                        {!isLoading && <Component {...pageProps} />}
                    </Elements>
                </SnackbarProvider>
                {!isLoading && !hasAcceptedCookies && <CookiesDialog />}
            </ThemeProvider>
        </React.Fragment>
    );
}

export default MyApp;
