//Utils & configs
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

// External components
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const PhoneNumberInput = (props) => {
    const theme = useTheme();

    return (
        <>
            <PhoneInput
                value={props.value}
                inputStyle={{ backgroundColor: theme.palette.background.secondary, width: "100%" }}
                dropdownStyle={{ backgroundColor: theme.palette.background.secondary, color: "gray", width: props.width }}
                containerStyle={{ width: "100%" }}
                specialLabel={""}
                onChange={(newValue) => props.handleChange(newValue)}
                placeholder={props.placeholder}
                inputProps={{
                    name: props.name
                }}
            />
        </>
    );
};

PhoneNumberInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.string.isRequired,
};

export default PhoneNumberInput;
