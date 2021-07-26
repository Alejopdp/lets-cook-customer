// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").recoverPassword;

// Internal components
import RecoverPasswordMail from "./recoverPasswordMail";
import RecoverPasswordCode from "./recoverPasswordCode";
import RecoverPassword from "./recoverPassword";
import FormPaper from "../../molecules/formPaper/formPaper";
import { Register } from "../../atoms/loginHelpers/loginHelpers";

const stepsQty = 3;

const RecoverPasswordForm = (props) => {
    const [currentStep, setcurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        code: "",
        password: "",
    });

    const router = useRouter();
    const lang = langs[router.locale];

    var currentInputs = <></>;

    const handleSubmit = (number) => {
        if (currentStep + number < 0 || currentStep + number > 2) alert("");
        setcurrentStep(currentStep + number);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRedirect = () => {
        router.push("/registrarme");
    };

    const handleRecover = () => {
        alert("Password cambiada con éxito");
    };

    switch (true) {
        case currentStep === 0:
            currentInputs = <RecoverPasswordMail handleChange={handleChange} handleSubmit={handleSubmit} value={formData.email} />;
            break;

        case currentStep === 1:
            currentInputs = <RecoverPasswordCode handleChange={handleChange} handleSubmit={handleSubmit} value={formData.code} />;
            break;

        case currentStep === 2:
            currentInputs = <RecoverPassword handleChange={handleChange} handleSubmit={handleRecover} value={formData.password} />;
            break;

        default:
            currentInputs = <RecoverPasswordMail handleChange={handleChange} handleSubmit={handleSubmit} value={formData.email} />;
    }

    return (
        <FormPaper title={lang.title}>
            {currentInputs}
            <Register
                text={lang.register.text}
                boldText={lang.register.boldText}
                handleRedirect={props.handleRedirect || handleRedirect}
            />
        </FormPaper>
    );
};

RecoverPasswordForm.propTypes = {};

export default RecoverPasswordForm;
