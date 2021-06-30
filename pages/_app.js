import "../styles/globals.scss";
import React, { useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import useLocalStorage from "../hooks/useLocalStorage/localStorage";
import cookies from "js-cookie";
import { useAuthStore, useUserInfoStore } from "../stores/auth";
import { verifyToken } from "../helpers/serverRequests/customer";

function MyApp(props) {
    const { Component, pageProps } = props;
    const { getFromLocalStorage, resetLocalStorage } = useLocalStorage();
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
                <CssBaseline />
                <Component {...pageProps} />
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
