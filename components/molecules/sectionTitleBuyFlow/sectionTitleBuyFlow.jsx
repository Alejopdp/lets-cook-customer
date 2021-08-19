// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useTheme } from '@material-ui/core'

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({

}));

const SectionTitleBuyFlow = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <Typography variant="h4" align='center' style={{ marginBottom: theme.spacing(1) }}>
                {props.title}
            </Typography>
            <Typography variant="body1" align='center' style={{ marginBottom: theme.spacing(4) }}>
                {props.subtitle}
            </Typography>
        </>
    );
};

SectionTitleBuyFlow.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};


export default SectionTitleBuyFlow;
