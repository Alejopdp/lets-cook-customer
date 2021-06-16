// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { isEmail } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").recoverPasswordMail;

// Internal components
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";

const RecoverPasswordMail = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
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
        </>
    );
};

RecoverPasswordMail.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default RecoverPasswordMail;
