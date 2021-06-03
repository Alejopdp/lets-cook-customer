// Utils & Config
import React from 'react'
import useStyles from "./styles";
import clsx from "clsx";

// External components
import { Box, Button, Typography } from '@material-ui/core';
import Image from 'next/image';

const SocialNetworksButtons = () => {
    const { button, facebook, google, txt } = useStyles();

    const handleFacebookLogin = () => {
        console.log("Facebook login")
    }

    const handleGoogleLogin = () => {
        console.log("Google login")
    }

    return (
        <Box>
            <Button className={clsx(button, facebook)} onClick={handleFacebookLogin}>
                <Image src="/assets/facebook.png" width={32} height={32} />

                <Typography variant="subtitle1" className={txt}>
                    Continuar con Facebook
                </Typography>
            </Button>

            <Button className={clsx(button, google)} onClick={handleGoogleLogin}>
                <Image src="/assets/google.png" width={32} height={32} />

                <Typography variant="subtitle1" className={txt}>
                    Continuar con Google
                </Typography>
            </Button>
        </Box>
    )
};

export default SocialNetworksButtons;