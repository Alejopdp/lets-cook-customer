// Utils & Config
import React from 'react'
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").recoverPasswordCode;

// External components
import { Typography } from '@material-ui/core';

// Internal components
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";

const RecoverPasswordCode = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <Typography variant="body2" paragraph>
                {lang.paragraph}
            </Typography>

            <TextInput
                label={lang.codeInput}
                name="code"
                value={props.value}
                onChange={props.handleChange}
                inputProps={{ maxLength: 6 }}
            />

            <CustomButton
                text={lang.buttonText}
                disabled={props.value.length !== 6}
                onClick={() => props.handleSubmit(1)}
            />
        </>
    )
}

RecoverPasswordCode.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default RecoverPasswordCode;
