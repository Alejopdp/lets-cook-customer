// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { isEmail, isEmpty } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").loginBox;
import { loginWithEmail, loginWithSocialMedia } from "../../../helpers/serverRequests/customer";
import cookies from "js-cookie";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput, PasswordInput } from "../../atoms/inputs/inputs";
import SocialNetworksButtons from "../../atoms/socialNetworksButtons/socialNetworksButtons";
import { Register } from "../../atoms/loginHelpers/loginHelpers";
import Divider from "../../atoms/divider/divider";
import useLocalStorage, { LOCAL_STORAGE_KEYS } from "../../../hooks/useLocalStorage/localStorage";
import { useAuthStore, useUserInfoStore } from "../../../stores/auth";
import { Grid, Typography, useTheme } from "@material-ui/core";
import { RoundedButton } from "@atoms";
import { localeRoutes, Routes } from "lang/routes/routes";
import useAnalytics from "hooks/useAnalytics";

const LoginBox = (props) => {
    const { trackLoginClick, trackSignUpClick, trackForgotPasswordClick } = useAnalytics();
    const [values, setValues] = useState({
        password: "",
        email: "",
    });
    const { saveInLocalStorage } = useLocalStorage();
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const [serverError, setserverError] = useState("");
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const lang = langs[router.locale];

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async () => {
        trackLoginClick();
        setIsLoading(true);

        const res = await loginWithEmail(values.email, values.password);

        if (res.status === 200) {
            saveLoginData(res.data.token, res.data.userInfo);
        } else {
            setserverError(res.data.message);
        }
        setIsLoading(false);
    };

    const handleSocialMediaSubmit = async (token, email = "") => {
        const res = await loginWithSocialMedia(token, email);

        if (res.status === 200) {
            saveLoginData(res.data.token, res.data.userInfo);
        } else {
            setserverError(res.data.message);
        }
    };

    const saveLoginData = (token, userInfo) => {
        saveInLocalStorage(LOCAL_STORAGE_KEYS.token, token);
        saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, userInfo);
        setUserInfo(userInfo);
        cookies.set(LOCAL_STORAGE_KEYS.token, token);
        setIsAuthenticated(true);
        props.redirect ? router.push(localeRoutes[router.locale][Routes.perfil]) : "";
        props.handleLogin ? props.handleLogin(userInfo) : "";
    };

    const handleRedirectToSignUp = () => {
        trackSignUpClick(props.source);
        router.push(localeRoutes[router.locale][Routes.registrarme]);
    };

    const handleRedirectToForgotPassword = () => {
        trackForgotPasswordClick(props.source);
        router.push(localeRoutes[router.locale][Routes["recuperar-contrasena"]]);
    };

    return (
        <FormPaper title={lang.title}>
            <SocialNetworksButtons handleSubmit={handleSocialMediaSubmit} source={props.source} />
            <Divider />
            <Grid item xs={12}>
                <TextInput label={lang.emailInput} name="email" value={values.email} onChange={handleChange("email")} />
            </Grid>
            <Grid item xs={12}>
                <PasswordInput
                    label={lang.passwordInput}
                    name="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    helperText={serverError}
                    hasError={!!serverError}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant="subtitle2"
                    color="primary"
                    style={{ fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                    onClick={props.handleForgotPasswordClick ? props.handleForgotPasswordClick : handleRedirectToForgotPassword}
                >
                    {lang.forgotPassword}
                </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: theme.spacing(2) }}>
                <RoundedButton
                    disabled={!isEmail(values.email) || isEmpty(values.password)}
                    isLoading={isLoading}
                    label={lang.buttonText}
                    onClick={handleSubmit}
                    style={{ width: "100%" }}
                />
            </Grid>
            <Register
                text={lang.register.text}
                boldText={lang.register.boldText}
                handleRedirect={props.handleSignUpClick ? props.handleSignUpClick : handleRedirectToSignUp}
            />
        </FormPaper>
    );
};

export default LoginBox;

LoginBox.propTypes = {
    redirect: PropTypes.bool,
    handleLogin: PropTypes.func,
    handleSignUpClick: PropTypes.func,
    dontRedirectForgotPassword: PropTypes.bool,
};
