// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core";

// External Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Internal components
import TextButton from "../../../components/atoms/textButton/textButton";

const ProfileTitleWithButton = props => {
    const theme = useTheme();

    return (
        <>
            <Grid item>
                <Typography variant="h6" style={{ color: theme.palette.text.secondary }}>
                    {props.title}
                </Typography>
            </Grid>
            <Grid item>
                <TextButton
                    style={{ color: theme.palette.primary.main }}
                    icon="plus-circle-outline"
                    btnText={props.btnText}
                />
            </Grid>
        </>
    );
};

export default ProfileTitleWithButton;
