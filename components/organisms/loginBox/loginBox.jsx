// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { isEmail, isPassword } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").loginBox;
import { loginWithEmail, loginWithSocialMedia } from "../../../helpers/serverRequests/customer";
import cookies from "js-cookie";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput, PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from "../../atoms/socialNetworksButtons/socialNetworksButtons";
import { ForgotPassword, Register } from "../../atoms/loginHelpers/loginHelpers";
import Divider from "../../atoms/divider/divider";
import useLocalStorage from "../../../hooks/useLocalStorage/localStorage";
import { useAuthStore, useUserInfoStore } from "../../../stores/auth";

const LoginBox = (props) => {
    const [values, setValues] = useState({
        password: "",
        email: "",
    });
    const { saveInLocalStorage } = useLocalStorage();
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const [serverError, setserverError] = useState("");
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async () => {
        const res = await loginWithEmail(values.email, values.password);

        if (res.status === 200) {
            saveLoginData(res.data.token, res.data.userInfo);
        } else {
            setserverError(res.data.message);
            alert("Error al querer ingresar");
        }
    };

    const handleSocialMediaSubmit = async (token) => {
        const res = await loginWithSocialMedia(token);

        if (res.status === 200) {
            saveLoginData(res.data.token, res.data.userInfo);
        } else {
            setserverError(res.data.message);
            alert("Error al querer ingresar");
        }
    };

    const saveLoginData = (token, userInfo) => {
        saveInLocalStorage("token", token);
        saveInLocalStorage("userInfo", userInfo);
        setUserInfo(userInfo);
        cookies.set("token", token);
        setIsAuthenticated(true);
        props.redirect ? router.push("/") : "";
        props.handleLogin ? props.handleLogin(userInfo) : "";
    };

    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <FormPaper title={lang.title}>
            <TextInput label={lang.emailInput} name="email" value={values.email} onChange={handleChange("email")} />

            <PasswordInput label={lang.passwordInput} name="password" value={values.password} onChange={handleChange("password")} />

            <ForgotPassword text={lang.forgotPassword} />

            <CustomButton text={lang.buttonText} onClick={handleSubmit} disabled={!isEmail(values.email) || !isPassword(values.password)} />

            <Divider />

            <SocialNetworksButtons handleSubmit={handleSocialMediaSubmit} />

            <Register text={lang.register.text} boldText={lang.register.boldText} redirectTo={lang.register.redirectTo} />
        </FormPaper>
    );
};

export default LoginBox;

LoginBox.propTypes = {
    redirect: PropTypes.bool,
    handleLogin: PropTypes.func,
};
