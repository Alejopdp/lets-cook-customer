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
import { verifyToken } from "../helpers/serverRequests/customer";
import { loadStripe } from "@stripe/stripe-js";
import { SnackbarProvider } from "notistack";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function MyApp(props) {
    const { Component, pageProps } = props;
    const { getFromLocalStorage, resetLocalStorage } = useLocalStorage();
    const [isLoading, setisLoading] = useState(true);
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

    useEffect(() => {
        const verifyAuthentication = async () => {
            const token = await getFromLocalStorage("token");

            if (!token) {
                return;
            }

            const res = await verifyToken(token);

            if (res.status === 200) {
                setIsAuthenticated(true);
                const userInfo = getFromLocalStorage("userInfo");
                setUserInfo(userInfo);
            } else {
                await resetLocalStorage();
            }

            setisLoading(false);
        };
        verifyAuthentication();
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Lets Cook</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <Elements stripe={stripePromise}>
                        <CssBaseline />
                        {/* TODO: IMPORTANT!!! Restore by down line */}
                        {/* {console.error("\n\nTODO: IMPORTANT!!! Restore by line below...\n\n")} */}
                        {<Component {...pageProps} />}
                        {!isLoading && <Component {...pageProps} />}
                    </Elements>
                </SnackbarProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default MyApp;

// export const getInitialProps = async (context) => {
//     console.log("ENTRA A LA PP");
//     const token = context.req.cookies.token;
//     if (!!!token) {
//         return { props: { isLogged: false } };
//     }

//     const res = await verifyToken(token);

//     if (res.status === 200) {
//         return { props: { isLogged: true } };
//     } else {
//         return { props: { isLogged: false } };
//     }
// };
