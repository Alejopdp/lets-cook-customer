// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import cookies from "js-cookie";
const langs = require("../../../lang").recoverPassword;
import { Routes, localeRoutes } from "lang/routes/routes";
import * as ga from "../../../helpers/ga";

// Internal components
import RecoverPasswordMail from "./recoverPasswordMail";
import RecoverPasswordCode from "./recoverPasswordCode";
import RecoverPassword from "./recoverPassword";
import FormPaper from "../../molecules/formPaper/formPaper";
import { ForgotPassword, Register } from "../../atoms/loginHelpers/loginHelpers";
import { forgotPassword, loginWithEmail, resetPassword, validateRecoverPasswordCode } from "../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";
import { useAuthStore, useUserInfoStore } from "@stores";
import { useLocalStorage } from "@hooks";

const stepsQty = 3;

const RecoverPasswordForm = (props) => {
    const [currentStep, setcurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        code: "",
        password: "",
    });
    const { enqueueSnackbar } = useSnackbar();
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const { saveInLocalStorage } = useLocalStorage();
    const [isLoadingRecoverPasswordMail, setIsLoadingRecoverPasswordMail] = useState(false);
    const [isLoadingRecoverPasswordCode, setIsLoadingRecoverPasswordCode] = useState(false);
    const [isLoadingRecoverPassword, setIsLoadingRecoverPassword] = useState(false);

    const router = useRouter();
    const lang = langs[router.locale];

    var currentInputs = <></>;

    const handleSubmitEmail = async () => {
        ga.event({
            action: "clic en recuperar contrasena",
            params: {
                event_category: `recupero de contrasena - ${props.source}`,
                event_label: "ingreso de email",
            },
        });

        setIsLoadingRecoverPasswordMail(true);

        const res = await forgotPassword(formData.email);

        if (res.status === 200) {
            setcurrentStep(currentStep + 1);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setIsLoadingRecoverPasswordMail(false);
    };

    const handleSubmitCode = async () => {
        ga.event({
            action: "clic en continuar",
            params: {
                event_category: `recupero de contrasena - ${props.source}`,
                event_label: "ingreso del codigo",
            },
        });

        setIsLoadingRecoverPasswordCode(true);

        const res = await validateRecoverPasswordCode(formData.code, formData.email);

        if (res.status === 200) {
            setcurrentStep(currentStep + 1);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setIsLoadingRecoverPasswordCode(false);
    };

    const handleSubmitNewPassword = async () => {
        ga.event({
            action: "clic en continuar",
            params: {
                event_category: `recupero de contrasena - ${props.source}`,
                event_label: "ingreso de nueva contrasena",
            },
        });

        setIsLoadingRecoverPassword(true);

        const res = await resetPassword(formData.password, formData.email, formData.code);

        if (res.status === 200) {
            if (props.handlePasswordRecoveredSuccesfully) {
                props.handlePasswordRecoveredSuccesfully();
            } else {
                const res = await loginWithEmail(formData.email, formData.password);

                if (res.status === 200) {
                    saveLoginData(res.data.token, res.data.userInfo);
                } else {
                    // setserverError(res.data.message);
                    enqueueSnackbar(res.data.message, { variant: "error" });
                }
            }
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setIsLoadingRecoverPassword(true);
    };

    const saveLoginData = (token, userInfo) => {
        saveInLocalStorage("token", token);
        saveInLocalStorage("userInfo", userInfo);
        setUserInfo(userInfo);
        cookies.set("token", token);
        setIsAuthenticated(true);
        router.push(localeRoutes[router.locale][Routes.perfil]);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRedirect = () => {
        router.push(localeRoutes[router.locale][Routes.registrarme]);
    };

    switch (true) {
        case currentStep === 0:
            currentInputs = (
                <RecoverPasswordMail
                    handleChange={handleChange}
                    handleSubmit={handleSubmitEmail}
                    value={formData.email}
                    isLoading={isLoadingRecoverPasswordMail}
                />
            );
            break;

        case currentStep === 1:
            currentInputs = (
                <RecoverPasswordCode
                    handleChange={handleChange}
                    handleSubmit={handleSubmitCode}
                    value={formData.code}
                    isLoading={isLoadingRecoverPasswordCode}
                />
            );
            break;

        case currentStep === 2:
            currentInputs = (
                <RecoverPassword
                    handleChange={handleChange}
                    handleSubmit={handleSubmitNewPassword}
                    value={formData.password}
                    isLoading={isLoadingRecoverPassword}
                />
            );
            break;

        default:
            currentInputs = (
                <RecoverPasswordMail
                    handleChange={handleChange}
                    handleSubmit={handleSubmitEmail}
                    value={formData.email}
                    isLoading={isLoadingRecoverPasswordMail}
                />
            );
    }

    return (
        <FormPaper title={lang.title}>
            {currentInputs}
            <Register
                text={lang.register.text}
                boldText={lang.register.boldText}
                handleRedirect={props.handleRedirect || handleRedirect}
                isSubmitting={isLoadingRecoverPassword}
            />
        </FormPaper>
    );
};

RecoverPasswordForm.propTypes = {
    handlePasswordRecoveredSuccesfully: PropTypes.func,
};

export default RecoverPasswordForm;
