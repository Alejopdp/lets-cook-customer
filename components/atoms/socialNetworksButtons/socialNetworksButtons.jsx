// Utils & Config
import React from 'react'
import useStyles from "./styles";
import clsx from "clsx";
import { useRouter } from "next/router";
import { socialNetworksButtons as langs } from "@lang";
import { loginWithFacebookAndGetIdToken, loginWithGoogleAndGetIdToken } from "../../../helpers/firebase";
import { useSnackbar } from "notistack";

// External components
import { Box, Button, Typography } from '@material-ui/core';
import Image from 'next/image';

export const SocialNetworksButtons = () => {
    const { button, facebook, google, txt } = useStyles();
    // const { enqueueSnackbar } = useSnackbar();

    const handleFacebookLogin = async () => {
        const token = await loginWithFacebookAndGetIdToken();

        if (!!token) {
            // enqueueSnackbar("Send to backend", { variant: "success" });
            props.handleSubmit(token);
        } else {
            // enqueueSnackbar("Error al querer ingresar con Facebook");
            alert("Error al querer ingresar con Facebook");
        }
    };

    const handleGoogleLogin = async () => {
        const token = await loginWithGoogleAndGetIdToken();

        if (!!token) {
            // enqueueSnackbar("Send to backend", { variant: "success" });
            props.handleSubmit(token);
        } else {
            // enqueueSnackbar("Error al querer ingresar con Google");
            alert("Error al querer ingresar con Google");
        }
    };

    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Box>
            <Button className={clsx(button, facebook)} onClick={handleFacebookLogin}>
                <Image src="/assets/facebook.png" width={32} height={32} />

                <Typography variant="subtitle1" className={txt}>
                    {lang.facebook}
                </Typography>
            </Button>

            <Button className={clsx(button, google)} onClick={handleGoogleLogin}>
                <Image src="/assets/google.png" width={32} height={32} />

                <Typography variant="subtitle1" className={txt}>
                    {lang.google}
                </Typography>
            </Button>
        </Box>
    )
};

export default SocialNetworksButtons;