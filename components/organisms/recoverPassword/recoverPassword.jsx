// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { isPassword } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").recoverPassword;

// External componentes
import { Typography, Grid } from "@material-ui/core";

// Internal components
import { PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { RoundedButton } from "@atoms";

const RecoverPassword = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="body2">
                    {lang.paragraph}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <PasswordInput
                    label={lang.passwordInput}
                    name="password"
                    value={props.value}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <RoundedButton
                    label={lang.buttonText}
                    disabled={!isPassword(props.value)}
                    isLoading={props.isLoading}
                    onClick={props.handleSubmit}
                    style={{ width: '100%' }}
                />
            </Grid>
        </>
    );
};

RecoverPassword.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default RecoverPassword;
