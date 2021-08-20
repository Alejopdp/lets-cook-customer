import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";
import { FirstContentProps } from "./interface";

const FirstContent = (props: FirstContentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.cardContent}>
            <Typography variant="h5" color="initial" style={{ marginBottom: 16 }}>
                {props.additionalPlanName}
            </Typography>
            <Typography variant="body2" color="initial" style={{ marginBottom: 8 }}>
                {props.description || "Description"}
            </Typography>
            <Typography variant="subtitle2" color="initial">
                Desde {props.minPrice}€
            </Typography>
        </div>
    );
};

FirstContent.propTypes = {};

export default FirstContent;
