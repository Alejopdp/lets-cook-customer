// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { BackButtonTitleProps } from "./interfaces";
// Icons & Images
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const BackButtonTitle = (props: BackButtonTitleProps) => {
    const theme = useTheme();

    return (
        <Grid container style={{ marginBottom: theme.spacing(3) }}>
            <Grid item xs={12}>
                <Link href={props.url}>
                    <Grid container alignItems="center" style={{ cursor: "pointer" }}>
                        <ArrowBackIcon style={{ marginRight: theme.spacing(1), color: "#707070" }} />
                        <Typography variant="h6" style={{ fontSize: "24px" }}>
                            {props.title}
                        </Typography>
                    </Grid>
                </Link>
            </Grid>
        </Grid>
    );
};

export default BackButtonTitle;
