import React, { useState } from "react";
import PropTypes from "prop-types";

import RecoverPassword from "./recoverPassword";
import RecoverPasswordCode from "./recoverPasswordCode";
import RecoverPasswordMail from "./recoverPasswordMail";

const stepsQty = 3;

const RecoverPasswordForm = (props) => {
    const [currentStep, setcurrentStep] = useState(0);
    const [formData, setformData] = useState({
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
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    switch (currentStep) {
        case currentStep === 0:
            currentInputs = <RecoverPassword handleChange handeSubmit password={formData.password} />;
            break;

        case currentStep === 1:
            currentInputs = <RecoverPasswordCode handleChange handeSubmit />;
            break;

        case currentStep === 2:
            currentInputs = <RecoverPasswordMail handleChange handeSubmit />;

        default:
            currentInputs = <RecoverPassword />;
    }

    return (
        <FormPaper
            fullWidth
            title="Recuperar contraseña"
            paragraph="El código ingresasdo es válido. Ingrese a continuación su nueva contraseña:"
        >
            {currentInputs}

            <Register text="¿Aún no tienes cuenta?" boldText="Registrate aquí" />
        </FormPaper>
    );
};

RecoverPasswordForm.propTypes = {};

export default RecoverPasswordForm;
