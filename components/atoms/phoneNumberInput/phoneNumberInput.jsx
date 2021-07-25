//Utils & configs
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";
import { paragraphFont } from '../../../styles/fonts.module.scss'

// External components
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const PhoneNumberInput = (props) => {
    const theme = useTheme();

    return (
        <>
            <PhoneInput
                value={props.value}
                inputStyle={{
                    backgroundColor: theme.palette.background.secondary,
                    width: "100%",
                    borderRadius: '8px',
                    color: theme.palette.text.secondary,
                    '&:focus': {
                        borderColor: theme.palette.primary.main
                    }
                }}
                dropdownStyle={{ backgroundColor: theme.palette.background.secondary, color: "gray", width: props.width }}
                containerStyle={{ width: "100%", fontFamily: paragraphFont, fontSize: '16px' }}
                specialLabel={"Número de móvil"}
                inputProps={{ name: props.name }}
                onChange={(value, country, event, formattedValue) => props.handleChange(event)}
                placeholder={props.placeholder}
                country="es"
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
