// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";

// External components

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { Register, AcceptLegalTerms } from "../../atoms/loginHelpers/loginHelpers";
import MailStep from "./mailStep";

const SignUpForm = (props) => {
    const [currentStep, setcurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    var currentInputs = <></>;

    const handleSubmit = (number) => {
        if (currentStep + number < 0 || currentStep + number > 1) alert("error");
        setcurrentStep(currentStep + number);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    switch (true) {
        case currentStep === 0:
            currentInputs = <MailStep handleChange={handleChange} handleSubmit={handleSubmit} email={formData.email} />;
            break;

        case currentStep === 1:
            currentInputs = <div> Segundo paso</div>;
            break;

        default:
            currentInputs = <MailStep handleChange={handleChange} handleSubmit={handleSubmit} email={formData.email} />;
    }

    return (
        <FormPaper fullWidth title="Crear tu cuenta">
            {currentInputs}
            <Register text="¿Ya tienes cuenta?" boldText="Ingresa aquí" redirectTo="/login" />
        </FormPaper>
    );
};

SignUpForm.propTypes = {};

export default SignUpForm;
