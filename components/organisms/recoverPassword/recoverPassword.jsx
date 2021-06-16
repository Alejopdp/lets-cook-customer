// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { isPassword } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").recoverPassword;

// External componentes
import { Typography } from "@material-ui/core";

// Internal components
import { PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";

const RecoverPassword = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <Typography variant="body2" paragraph>
                {lang.paragraph}
            </Typography>

            <PasswordInput
                label={lang.passwordInput}
                name="password"
                value={props.value}
                onChange={props.handleChange}
            />

            <CustomButton
                text={lang.buttonText}
                disabled={!isPassword(props.value)}
                onClick={props.handleSubmit}
            />
        </>
    );
};

RecoverPassword.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default RecoverPassword;
