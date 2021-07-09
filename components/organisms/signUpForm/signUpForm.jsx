// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").signupForm;
import { useUserInfoStore } from "../../../stores/auth";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { Register } from "../../atoms/loginHelpers/loginHelpers";
import MailStep from "./mailStep";
import PasswordStep from "./passwordStep";
import { signUp } from "../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";
import useLocalStorage from "../../../hooks/useLocalStorage/localStorage";

const SignUpForm = (props) => {
    const [currentStep, setcurrentStep] = useState(0);
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        authorize: false,
        sendInfo: false,
    });
    const { enqueueSnackbar } = useSnackbar();
    const { saveInLocalStorage } = useLocalStorage();

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

    const handleCreateAccount = async () => {
        const res = await signUp(formData.email, formData.password);

        if (res.status === 200) {
            saveInLocalStorage("userInfo", res.data.userInfo);
            setUserInfo(res.data.userInfo);
            // setIsAuthenticated(true);
            props.handleSignUp ? props.handleSignUp() : "";
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleRedirect = () => {
        router.push("/ingresar");
    };

    const router = useRouter();
    const lang = langs[router.locale];

    switch (true) {
        case currentStep === 0:
            currentInputs = (
                <MailStep
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    email={formData.email}
                    signUpRedirect={props.redirect}
                    handleSignUp={props.handleSignUp}
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
                    handleSubmit={props.handleCreateAccount || handleCreateAccount}
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
                />
            );
    }

    return (
        <FormPaper title={lang.title}>
            {currentInputs}
            <Register
                text={lang.register.text}
                boldText={lang.register.boldText}
                // redirectTo={lang.register.redirectTo}
                handleRedirect={props.handleRedirect || handleRedirect}
            />
        </FormPaper>
    );
};

SignUpForm.propTypes = {
    handleCreateAccount: PropTypes.func,
    handleRedirect: PropTypes.func,
    handleSignUp: PropTypes.func,
    redirect: PropTypes.bool,
};

export default SignUpForm;
