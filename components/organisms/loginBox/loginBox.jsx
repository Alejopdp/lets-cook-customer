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
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from "../../atoms/socialNetworksButtons/socialNetworksButtons";
import { ForgotPassword, Register } from "../../atoms/loginHelpers/loginHelpers";
import Divider from "../../atoms/divider/divider";
import useLocalStorage from "../../../hooks/useLocalStorage/localStorage";
import { useAuthStore, useUserInfoStore } from "../../../stores/auth";
import { useSnackbar } from "notistack";
import { Grid, Typography, useTheme } from "@material-ui/core";
import { RoundedButton } from "@atoms";

const LoginBox = (props) => {
    const [values, setValues] = useState({
        password: "",
        email: "",
    });
    const { saveInLocalStorage } = useLocalStorage();
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const [serverError, setserverError] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async () => {
        const res = await loginWithEmail(values.email, values.password);

        if (res.status === 200) {
            saveLoginData(res.data.token, res.data.userInfo);
        } else {
            setserverError(res.data.message);
            // alert("Error al querer ingresar");
        }
    };

    const handleSocialMediaSubmit = async (token) => {
        const res = await loginWithSocialMedia(token);

        if (res.status === 200) {
            saveLoginData(res.data.token, res.data.userInfo);
        } else {
            setserverError(res.data.message);
            // enqueueSnackbar(res.data.message);
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

    const handleRedirectToSignUp = () => {
        router.push("/registrarme");
    };

    return (
        <FormPaper title={lang.title}>
            <SocialNetworksButtons handleSubmit={handleSocialMediaSubmit} />
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
                {props.dontRedirectForgotPassword ? (
                    <Typography
                        variant="subtitle2"
                        color="primary"
                        style={{ fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                        onClick={props.handleForgotPasswordClick}
                    >
                        Olvidé mi contraseña
                    </Typography>
                ) : (
                    <ForgotPassword text={lang.forgotPassword} handleRedirect={props.handleRedirect} />
                )}
            </Grid>
            <Grid item xs={12} style={{ marginTop: theme.spacing(2) }}>
                <RoundedButton
                    disabled={!isEmail(values.email) || isEmpty(values.password)}
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
