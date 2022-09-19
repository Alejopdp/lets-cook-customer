// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "95vw",
        margin: "0 auto",
    },
    marg2: {
        marginBottom: theme.spacing(2),
    },
    img: {
        display: "flex",
        flex: 1,
        borderRadius: 8,
        width: "100%",
        maxWidth: 480,
    },
}));

const HowItWorksExtended = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid
            container
            spacing={4}
            direction={props.direction}
            justify="center"
            alignItems="center"
            style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
        >
            <Grid item xs={12} sm={6}>
                <img className={classes.img} src={props.image} alt={props.title} style={{ ...props.style }} />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Typography variant="h4" className={classes.marg2}>
                    {props.title}
                </Typography>
                <Typography variant="body1">{props.subtitle}</Typography>
            </Grid>
        </Grid>
    );
};

HowItWorksExtended.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default HowItWorksExtended;
