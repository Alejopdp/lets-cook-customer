// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    padd2: {
        paddingBottom: theme.spacing(2),
    },
    margin0: {
        maxWidth: "100vw",
        margin: "0 auto",
    },
}));

const HowItWorksExtended = (props) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3} direction={props.direction} justify="center" alignItems="center" className={clsx(classes.margin0)}>
            <Grid item xs={12} sm={3}>
                <Image src="/unnamed.jpg" layout="responsive" width={222} height={151} />
            </Grid>

            <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1" className={classes.padd2}>
                    {props.title}
                </Typography>

                <Typography variant="body2">{props.subtitle}</Typography>
            </Grid>
        </Grid>
    );
};

HowItWorksExtended.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default HowItWorksExtended;
