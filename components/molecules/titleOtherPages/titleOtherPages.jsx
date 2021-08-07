// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    padd2: {
        paddingBottom: theme.spacing(1),
    },
    padd4: {
        paddingBottom: theme.spacing(5),
    },
    align: {
        alignContent: "center",
    },
}));

const TitleOtherPages = (props) => {
    const classes = useStyles();

    return (
        <Grid container direction="column" alignItems={props.align || "center"} className={clsx(classes.padd4, classes.align)}>
            <Grid item xs={12} sm={12}>
                <Typography variant="h2" color={props.color || "primary"} className={classes.padd2}>
                    {props.title}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Typography variant="body1" color="textSecondary">
                    {props.subtitle}
                </Typography>
            </Grid>
        </Grid>
    );
};

TitleOtherPages.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    align: PropTypes.string,
    color: PropTypes.string,
};

TitleOtherPages.defaultProps = {
    align: "center",
    color: "primary",
};

export default TitleOtherPages;
