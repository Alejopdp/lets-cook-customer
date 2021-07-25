// Utils & Config
import React from "react";
import useStyles from "./styles";
import clsx from "clsx";
import { useRouter } from "next/router";
import { socialNetworksButtons as langs } from "@lang";
import { loginWithFacebookAndGetIdToken, loginWithGoogleAndGetIdToken } from "../../../helpers/firebase";
import { useSnackbar } from "notistack";

// External components
import { Box, Button, Typography, Grid } from "@material-ui/core";
import Image from "next/image";

export const SocialNetworksButtons = (props) => {
    const { button, facebook, google, txt } = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const handleFacebookLogin = async () => {
        const token = await loginWithFacebookAndGetIdToken();

        if (!!token) {
            props.handleSubmit(token);
        } else {
            enqueueSnackbar("Error al querer ingresar con Facebook");
        }
    };

    const handleGoogleLogin = async () => {
        const token = await loginWithGoogleAndGetIdToken();

        if (!!token) {
            props.handleSubmit(token);
        } else {
            enqueueSnackbar("Error al querer ingresar con Google");
        }
    };

    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <Grid item xs={12}>
                <Button className={clsx(button, facebook)} onClick={handleFacebookLogin}>
                    <Image src="/assets/facebook.png" width={20} height={20} />
                    <Typography variant="subtitle1" className={txt}>
                        {lang.facebook}
                    </Typography>
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button className={clsx(button, google)} onClick={handleGoogleLogin}>
                    <Image src="/assets/google.png" width={20} height={20} />
                    <Typography variant="subtitle1" className={txt}>
                        {lang.google}
                    </Typography>
                </Button>
            </Grid>
        </>
    );
};

export default SocialNetworksButtons;
