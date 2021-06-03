import "../styles/globals.scss";
import React, { useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";

function MyApp(props) {
    const { Component, pageProps } = props;

    // useEffect(() => {
    //     const mailerLiteBottomBar = document.getElementById("ml-webforms-popup-4174405");
    //     const style = window.getComputedStyle(mailerLiteBottomBar);
    //     const visibility = style.getPropertyValue("visibility");
    //     console.log("MAILER LITE: ", mailerLiteBottomBar);
    //     console.log("Visibility: ", visibility);
    // }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Let's Cook</title>
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
