// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";

// External components
import { Typography, Grid } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";

// Icons & Images
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

const BackButtonTitle = (props) => {
    const theme = useTheme();
    const matches = useMediaQuery("(max-width:600px)");
    return (
        <Grid container style={{ marginBottom: theme.spacing(3) }}>
            <Grid item xs={12}>
                <Link href={props.url} replace>
                    <Grid container alignItems="center" style={{ cursor: "pointer" }}>
                        <ArrowBackIcon style={{ marginRight: theme.spacing(1), color: "#515151" }} />
                        <Typography variant="h6" style={{ fontSize: matches ? "20px" : "24px" }}>
                            {props.title}
                        </Typography>
                    </Grid>
                </Link>
            </Grid>
        </Grid>
    );
};

export default BackButtonTitle;
