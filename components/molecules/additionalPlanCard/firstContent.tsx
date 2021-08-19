import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";
import { FirstContentProps } from "./interface";

const FirstContent = (props: FirstContentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.cardContent}>
            <Typography variant="body2" color="initial" style={{ marginBottom: '16px' }}>
                {props.description || "Description"}
            </Typography>
            <Typography variant="subtitle2" color="initial">
                {props.minPrice || "Desde X €"}
            </Typography>
        </div>
    );
};

FirstContent.propTypes = {};

export default FirstContent;
