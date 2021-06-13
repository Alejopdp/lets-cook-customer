// Utils & Config
import React, { useState } from "react";
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { Radio, FormControlLabel } from "@material-ui/core";

const QuantityBox = ({ label, state }) => {
    const classes = useStyles();

    return (
        <FormControlLabel
            className={clsx(classes.box, {
                [classes.checkedBox]: state,
            })}
            value={`${label}`}
            control={<Radio className={classes.hidden} />}
            label={
                <Typography variant="subtitle1" color={state ? "primary" : "initial"}>
                    {label}
                </Typography>
            }
        />
    );
};

QuantityBox.propTypes = {
    label: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired,
};

export default QuantityBox;
