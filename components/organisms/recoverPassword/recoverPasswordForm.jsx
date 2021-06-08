import React, { useState } from "react";
import PropTypes from "prop-types";

import RecoverPasswordMail from "./recoverPasswordMail";
import RecoverPasswordCode from "./recoverPasswordCode";
import RecoverPassword from "./recoverPassword";

const stepsQty = 3;

const RecoverPasswordForm = (props) => {
    const [currentStep, setcurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        code: "",
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

    console.log(formData)
    console.log(currentStep)

    switch (currentStep) {
        case currentStep === 0:
            currentInputs = <RecoverPasswordMail handleChange handeSubmit value={formData.email}/>;
            break;

        case currentStep === 1:
            currentInputs = <RecoverPasswordCode handleChange handeSubmit />;
            break;

        case currentStep === 2:
            currentInputs = <RecoverPassword handleChange handleSubmit value={formData.password} />;

        default:
            currentInputs = <RecoverPasswordMail />;
    }

    return (
        <>
            {currentInputs}
        </>
    );
};

RecoverPasswordForm.propTypes = {};

export default RecoverPasswordForm;
