import React, { useState } from "react";
import PropTypes from "prop-types";

import RecoverPasswordMail from "./recoverPasswordMail";
import RecoverPasswordCode from "./recoverPasswordCode";
import RecoverPassword from "./recoverPassword";

const stepsQty = 3;

const RecoverPasswordForm = () => {
    const [currentStep, setcurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        code: "",
        password: "",
    });

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

    const handleLogin = () => {
        alert("Login exitoso")
    }

    switch (true) {
        case currentStep === 0:
            currentInputs = <RecoverPasswordMail handleChange={handleChange} handleSubmit={handleSubmit} value={formData.email} />;
            break;

        case currentStep === 1:
            currentInputs = <RecoverPasswordCode handleChange={handleChange} handleSubmit={handleSubmit} value={formData.code} />;
            break;

        case currentStep === 2:
            currentInputs = <RecoverPassword handleChange={handleChange} handleSubmit={handleLogin} value={formData.password} />;
            break;

        default:
            currentInputs = <RecoverPasswordMail />;
    }

    return <>{currentInputs}</>;
};

RecoverPasswordForm.propTypes = {};

export default RecoverPasswordForm;
