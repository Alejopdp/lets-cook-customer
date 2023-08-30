// Utils & Config
import React from "react";
import useStyles from "./styles";
import clsx from "clsx";
import * as ga from "../../../helpers/ga";

// External components
import { Button, Typography, Grid } from "@material-ui/core";
import Image from "next/image";
import { useLang } from "@hooks";
import { useAuth } from "contexts/auth.context";

type SocialNetworksButtonsProps = {
    source: string;
};

export const SocialNetworksButtons = (props: SocialNetworksButtonsProps) => {
    const { button, google, txt } = useStyles();
    const [lang] = useLang("socialNetworksButtons");
    const { signInWithGoogle } = useAuth();

    const handleGoogleLogin = async () => {
        ga.event({
            action: "clic en continuar con rrss",
            params: {
                event_category: `registrarse - ${props.source}`,
                event_label: "google",
            },
        });

        signInWithGoogle();
    };

    return (
        <>
            <Grid item xs={12}>
                <Button className={clsx(button, google)} onClick={handleGoogleLogin}>
                    <Image src="/assets/google.png" width={20} height={20} unoptimized />
                    <Typography variant="h6" className={txt}>
                        {lang.google}
                    </Typography>
                </Button>
            </Grid>
        </>
    );
};

export default SocialNetworksButtons;
