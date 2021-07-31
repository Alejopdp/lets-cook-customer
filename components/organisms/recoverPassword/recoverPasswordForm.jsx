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
import { ForgotPassword, Register } from "../../atoms/loginHelpers/loginHelpers";
import { forgotPassword, resetPassword, validateRecoverPasswordCode } from "helpers/serverRequests/customer";
import { useSnackbar } from "notistack";

const stepsQty = 3;

const RecoverPasswordForm = (props) => {
    const [currentStep, setcurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        code: "",
        password: "",
    });
    const { enqueueSnackbar } = useSnackbar();

    const router = useRouter();
    const lang = langs[router.locale];

    var currentInputs = <></>;

    const handleSubmitEmail = async () => {
        const res = await forgotPassword(formData.email);

        if (res.status === 200) {
            setcurrentStep(currentStep + 1);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleSubmitCode = async () => {
        const res = await validateRecoverPasswordCode(formData.code, formData.email);

        if (res.status === 200) {
            setcurrentStep(currentStep + 1);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleSubmitNewPassword = async () => {
        const res = await resetPassword(formData.password, formData.email, formData.code);

        if (res.status === 200) {
            // setcurrentStep(currentStep + 1);
            props.handlePasswordRecoveredSuccesfully();
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
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

    switch (true) {
        case currentStep === 0:
            currentInputs = <RecoverPasswordMail handleChange={handleChange} handleSubmit={handleSubmitEmail} value={formData.email} />;
            break;

        case currentStep === 1:
            currentInputs = <RecoverPasswordCode handleChange={handleChange} handleSubmit={handleSubmitCode} value={formData.code} />;
            break;

        case currentStep === 2:
            currentInputs = (
                <RecoverPassword handleChange={handleChange} handleSubmit={handleSubmitNewPassword} value={formData.password} />
            );
            break;

        default:
            currentInputs = <RecoverPasswordMail handleChange={handleChange} handleSubmit={handleSubmitEmail} value={formData.email} />;
    }

    return (
        <FormPaper title={lang.title}>
            {currentInputs}
            <Register text={lang.register.text} boldText={lang.register.boldText} handleRedirect={props.handleRedirect || handleRedirect} />
        </FormPaper>
    );
};

RecoverPasswordForm.propTypes = {
    handlePasswordRecoveredSuccesfully: PropTypes.func,
};

export default RecoverPasswordForm;
