//Utils & configs
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";
import { paragraphFont } from "../../../styles/fonts.module.scss";

// External components
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const PhoneNumberInput = (props) => {
    const theme = useTheme();

    return (
        <>
            <PhoneInput
                localization="es"
                value={props.value}
                inputStyle={{
                    backgroundColor: "transparent",
                    width: "100%",
                    borderRadius: "8px",
                    color: theme.palette.primary.main,
                    "&:focus": {
                        borderColor: theme.palette.primary.main,
                    },
                    "&:hover": {
                        borderColor: "unset",
                    },
                    "&:disabled": {
                        color: theme.palette.primary.main,
                        cursor: "default",
                    },
                }}
                dropdownStyle={{ backgroundColor: "transparent", color: "gray", width: props.width }}
                containerStyle={{ width: "100%", fontFamily: paragraphFont, fontSize: "16px" }}
                specialLabel={props.label}
                inputProps={{ name: props.name, autoComplete: "no", label: props.label }}
                onChange={(value, country, event, formattedValue) => {
                    props.handleChange(event);
                }}
                countryCodeEditable={false}
                placeholder={props.placeholder}
                country="es"
                enableSearch
                disableCountryGuess
                disabled={props.disabled}
            />
        </>
    );
};

PhoneNumberInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default PhoneNumberInput;
