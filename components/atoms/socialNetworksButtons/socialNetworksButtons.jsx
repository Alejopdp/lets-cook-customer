// Utils & Config
import React from "react";
import useStyles from "./styles";
import clsx from "clsx";
import { useRouter } from "next/router";
import * as ga from "../../../helpers/ga";
import { loginWithFacebookAndGetIdToken, loginWithGoogleAndGetIdToken } from "../../../helpers/firebase";
import { useSnackbar } from "notistack";

// External components
import { Box, Button, Typography, Grid } from "@material-ui/core";
import Image from "next/image";
import { useLang } from "@hooks";

export const SocialNetworksButtons = (props) => {
    const { button, facebook, google, txt } = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [lang] = useLang("socialNetworksButtons");

    const handleFacebookLogin = async () => {
        ga.event({
            action: "clic en continuar con rrss",
            params: {
                event_category: `registrarse - ${props.source}`,
                event_label: "facebook",
            },
        });

        const { token, error, email } = await loginWithFacebookAndGetIdToken();

        if (!!token) {
            props.handleSubmit(token, email);
        } else {
            enqueueSnackbar(
                error.code === "auth/account-exists-with-different-credential"
                    ? "El email ha sido registrado con otro autenticador. Por favor, pruebe iniciando sesión de otra manera"
                    : error.message,
                { variant: "error" }
            );
        }
    };

    const handleGoogleLogin = async () => {
        ga.event({
            action: "clic en continuar con rrss",
            params: {
                event_category: `registrarse - ${props.source}`,
                event_label: "google",
            },
        });

        const { token, error } = await loginWithGoogleAndGetIdToken();

        if (!!token) {
            props.handleSubmit(token);
        } else {
            enqueueSnackbar(
                error.code === "auth/account-exists-with-different-credential"
                    ? "El email ha sido registrado con otro autenticador. Por favor, pruebe iniciando sesión de otra manera"
                    : error.message,
                { variant: "error" }
            );
            // enqueueSnackbar(lang.googleError);
        }
    };

    return (
        <>
            {/* <Grid item xs={12}>
                <Button className={clsx(button, facebook)} onClick={handleFacebookLogin}>
                    <Image src="/assets/facebook.png" width={20} height={20} />
                    <Typography variant="h6" className={txt}>
                        {lang.facebook}
                    </Typography>
                </Button>
            </Grid> */}
            <Grid item xs={12}>
                <Button className={clsx(button, google)} onClick={handleGoogleLogin}>
                    <Image src="/assets/google.png" width={20} height={20} />
                    <Typography variant="h6" className={txt}>
                        {lang.google}
                    </Typography>
                </Button>
            </Grid>
        </>
    );
};

export default SocialNetworksButtons;
