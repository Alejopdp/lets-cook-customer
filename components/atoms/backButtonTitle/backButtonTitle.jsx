// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "next/link";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


// Icons & Images
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({

}));

const BackButtonTitle = props => {
    const classes = useStyles();
    const theme = useTheme();
    const { root, image, marg1, marg2, publisher, date, tags } = classes;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Link href={props.url}>
                    <Grid container alignItems="center" style={{ marginBottom: theme.spacing(3), cursor: "pointer" }}>
                        <ArrowBackIcon style={{ marginRight: theme.spacing(1), color: "#2b2b2b" }} />
                        <Typography variant="h6" style={{ color: "#2b2b2b" }}>
                            {props.title}
                        </Typography>
                    </Grid>
                </Link>
            </Grid>
        </Grid>

    );
};

export default BackButtonTitle;
