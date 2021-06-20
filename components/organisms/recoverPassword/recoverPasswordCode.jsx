// Utils & Config
import React from 'react'
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").recoverPasswordCode;

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { Register } from '../../atoms/loginHelpers/loginHelpers';

const RecoverPasswordCode = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <FormPaper title={lang.title} paragraph={lang.paragraph}>
            <TextInput
                label={lang.codeInput}
                name="code"
                value={props.value}
                onChange={props.handleChange}
            />

            <CustomButton
                text={lang.buttonText}
                disabled={props.value.length !== 6}
                onClick={() => props.handleSubmit(1)}
            />

            <Register
                text={lang.register.text}
                boldText={lang.register.boldText}
                redirectTo={lang.register.redirectTo}
            />
        </FormPaper>
    )
}

RecoverPasswordCode.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

export default RecoverPasswordCode;
