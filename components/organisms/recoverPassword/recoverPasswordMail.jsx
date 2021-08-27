// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { isEmail } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").recoverPasswordMail;

// Internal components
import { TextInput } from "../../atoms/inputs/inputs";
import { RoundedButton } from "@atoms";
import { useTheme, Grid } from '@material-ui/core';


const RecoverPasswordMail = (props) => {
    const router = useRouter();
    const theme = useTheme();
    const lang = langs[router.locale];

    return (
        <>
            <Grid item xs={12}>
                <TextInput
                    label={lang.emailInput}
                    name="email"
                    value={props.value}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <RoundedButton
                    label={lang.buttonText}
                    onClick={() => props.handleSubmit(1)}
                    disabled={!isEmail(props.value)}
                    isLoading={props.isLoading}
                    style={{ width: '100%' }}
                />
            </Grid>
        </>
    );
};

RecoverPasswordMail.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default RecoverPasswordMail;
