// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { isEmail } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").recoverPasswordMail;

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { Register } from "../../atoms/loginHelpers/loginHelpers";

const RecoverPasswordMail = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <FormPaper title={lang.title}>
            <TextInput
                label={lang.emailInput}
                name="email"
                value={props.value}
                onChange={props.handleChange}
            />

            <CustomButton
                text={lang.buttonText}
                onClick={() => props.handleSubmit(1)}
                disabled={!isEmail(props.value)}
            />

            <Register
                text={lang.register.text}
                boldText={lang.register.boldText}
                redirectTo={lang.register.redirectTo}
            />
        </FormPaper>
    );
};

RecoverPasswordMail.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

export default RecoverPasswordMail;
