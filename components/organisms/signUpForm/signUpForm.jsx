// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").signupForm;
import { useUserInfoStore, useAuthStore } from "../../../stores/auth";
import cookies from "js-cookie";
import * as ga from "../../../helpers/ga";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { Register } from "../../atoms/loginHelpers/loginHelpers";
import MailStep from "./mailStep";
import PasswordStep from "./passwordStep";
import { signUp } from "../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";
import useLocalStorage from "../../../hooks/useLocalStorage/localStorage";
import TermsAndConditionsModal from "../../molecules/legalModals/termsAndConditionsModal";
import PrivacyPolicyModal from "../../molecules/legalModals/privacyPolicyModal";

// External Components
import { Grid } from "@material-ui/core";

const SignUpForm = (props) => {
    const [currentStep, setcurrentStep] = useState(0);
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        authorize: false,
        sendInfo: false,
    });
    const [openTycModal, setOpenTycModal] = React.useState(false);
    const [openPrivacyPolicyModal, setOpenPrivacyPolicyModal] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const { saveInLocalStorage } = useLocalStorage();

    var currentInputs = <></>;

    const handleSubmit = (number) => {
        ga.event({
            action: "clic en continuar",
            params: {
                event_category: `registrarse - ${props.source}`,
                event_label: "correo electronico",
            },
        });
        setIsLoading(true);
        if (currentStep + number < 0 || currentStep + number > 1) alert("error");
        setcurrentStep(currentStep + number);
        setIsLoading(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxesChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: !formData[e.target.name],
        });
    };

    const handleCreateAccount = async () => {
        ga.event({
            action: "clic en registrarme",
            params: {
                event_category: `registrarse - ${props.source}`,
                event_label: "ingrese su contrasena",
            },
        });

        const res = await signUp(formData.email, formData.password, props.source === "buyFlow");

        if (res.status === 200) {
            saveInLocalStorage("userInfo", res.data.userInfo);
            setUserInfo(res.data.userInfo);
            saveInLocalStorage("token", res.data.token);
            cookies.set("token", res.data.token);
            setIsAuthenticated(true);
            props.handleSignUp ? props.handleSignUp(res.data.userInfo, formData.sendInfo) : "";
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleRedirect = () => {
        ga.event({
            action: "clic en iniciar sesion",
            params: {
                event_category: `registrarse - ${props.source}`,
                event_label: "ya tienes cuenta",
            },
        });
        router.push("/iniciar-sesion");
    };

    const router = useRouter();
    const lang = langs[router.locale];

    // TyC Modal Functions

    const handleOpenTycModal = () => {
        setOpenTycModal(true);
    };

    const handleCloseTycModal = () => {
        setOpenTycModal(false);
    };

    // Privacy Policy Modal Functions

    const handleOpenPrivacyPolicyModal = () => {
        setOpenPrivacyPolicyModal(true);
    };

    const handleClosePrivacyPolicyModal = () => {
        setOpenPrivacyPolicyModal(false);
    };

    switch (true) {
        case currentStep === 0:
            currentInputs = (
                <MailStep
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    email={formData.email}
                    signUpRedirect={props.redirect}
                    handleSignUp={props.handleSignUp}
                    handleOpenTycModal={handleOpenTycModal}
                    handleOpenPrivacyPolicyModal={handleOpenPrivacyPolicyModal}
                    source={props.source}
                />
            );
            break;

        case currentStep === 1:
            currentInputs = (
                <PasswordStep
                    password={formData.password}
                    authorize={formData.authorize}
                    sendInfo={formData.sendInfo}
                    handleChange={handleChange}
                    handleCheckboxesChange={handleCheckboxesChange}
                    handleSubmit={props.handleCreateAccount || handleCreateAccount}
                    handleOpenTycModal={handleOpenTycModal}
                    handleOpenPrivacyPolicyModal={handleOpenPrivacyPolicyModal}
                    source={props.source}
                    isLoading={isLoading}
                    handleSignUp={props.handleSignUp}
                />
            );
            break;

        default:
            currentInputs = (
                <MailStep
                    signUpRedirect={props.redirect}
                    handleSignUp={props.handleSignUp}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    email={formData.email}
                    handleOpenTycModal={handleOpenTycModal}
                    handleOpenPrivacyPolicyModal={handleOpenPrivacyPolicyModal}
                    source={props.source}
                />
            );
    }

    return (
        <>
            <FormPaper title={lang.title}>
                {currentInputs}
                <Register
                    text={lang.register.text}
                    boldText={lang.register.boldText}
                    // redirectTo={lang.register.redirectTo}
                    handleRedirect={props.handleRedirect || handleRedirect}
                />
            </FormPaper>
            <TermsAndConditionsModal open={openTycModal} handleClose={handleCloseTycModal} />
            <PrivacyPolicyModal open={openPrivacyPolicyModal} handleClose={handleClosePrivacyPolicyModal} />
        </>
    );
};

SignUpForm.propTypes = {
    handleCreateAccount: PropTypes.func,
    handleRedirect: PropTypes.func,
    handleSignUp: PropTypes.func,
    redirect: PropTypes.bool,
    source: PropTypes.string,
};

export default SignUpForm;
