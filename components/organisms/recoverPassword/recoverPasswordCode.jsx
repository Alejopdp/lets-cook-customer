// Utils & Config
import React from 'react'
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").recoverPasswordCode;

// External components
import { Typography, Grid } from '@material-ui/core';

// Internal components
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { RoundedButton } from '@atoms';

const RecoverPasswordCode = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="body2" >
                    {lang.paragraph}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    label={lang.codeInput}
                    name="code"
                    value={props.value}
                    onChange={props.handleChange}
                    inputProps={{ maxLength: 6 }}
                />
            </Grid>
            <Grid item xs={12}>
                <RoundedButton
                    label={lang.buttonText}
                    disabled={props.value.length !== 6}
                    isLoading={props.isLoading}
                    onClick={() => props.handleSubmit(1)}
                    style={{ width: '100%' }}
                />
            </Grid>
        </>
    )
}

RecoverPasswordCode.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default RecoverPasswordCode;
