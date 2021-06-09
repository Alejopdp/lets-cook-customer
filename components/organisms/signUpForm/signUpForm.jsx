// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { Register } from "../../atoms/loginHelpers/loginHelpers";
import MailStep from "./mailStep";
import PasswordStep from "./passwordStep";

const SignUpForm = (props) => {
    const [currentStep, setcurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        authorize: false,
        sendInfo: false
    });

    var currentInputs = <></>;

    const handleSubmit = (number) => {
        if (currentStep + number < 0 || currentStep + number > 1) alert("error");
        setcurrentStep(currentStep + number);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value || e.target.checked,
        });
    };

    const handleCreateAccount = () => {
        alert("Cuenta creada (redireccionar a perfil de usuario)")
    }

    switch (true) {
        case currentStep === 0:
            currentInputs = <MailStep handleChange={handleChange} handleSubmit={handleSubmit} email={formData.email} />;
            break;

        case currentStep === 1:
            currentInputs =
                <PasswordStep
                    password={formData.password}
                    authorize={formData.authorize}
                    sendInfo={formData.sendInfo}
                    handleChange={handleChange}
                    handleSubmit={handleCreateAccount}
                />;
            break;

        default:
            currentInputs = <MailStep handleChange={handleChange} handleSubmit={handleSubmit} email={formData.email} />;
    }

    return (
        <FormPaper fullWidth title="Crear tu cuenta">
            {currentInputs}
            <Register text="¿Ya tienes cuenta?" boldText="Ingresa aquí" redirectTo="/ingresar" />
        </FormPaper>
    );
};

SignUpForm.propTypes = {};

export default SignUpForm;
