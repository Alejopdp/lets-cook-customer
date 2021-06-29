// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { isPassword } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").recoverPassword;

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { Register } from "../../atoms/loginHelpers/loginHelpers";

const RecoverPassword = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <FormPaper
            title={lang.title}
            paragraph={lang.paragraph}
        >
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

            <Register
                text={lang.register.text}
                boldText={lang.register.boldText}
                redirectTo={lang.register.redirectTo}
            />
        </FormPaper>
    );
};

RecoverPassword.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

export default RecoverPassword;
