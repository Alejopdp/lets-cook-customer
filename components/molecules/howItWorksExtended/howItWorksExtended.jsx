// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "95vw",
        margin: "0 auto",
    },
    marg2: {
        marginBottom: theme.spacing(2),
    },
    img: {
        borderRadius: "8px",
    },
}));

const HowItWorksExtended = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        // <div className={classes.root}>
        <Grid
            container
            spacing={4}
            direction={props.direction}
            justify="center"
            alignItems="center"
            style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
        >
            <Grid item xs={12} sm={6}>
                <Image src="/unnamed.jpg" layout="responsive" width={222} height={151} className={classes.img} />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" className={classes.marg2}>
                    {props.title}
                </Typography>
                <Typography variant="body2">
                    {props.subtitle}
                </Typography>
            </Grid>

        </Grid>
        // </div>
    );
};

HowItWorksExtended.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default HowItWorksExtended;
