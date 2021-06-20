// Utils & Config
import React, { useState } from 'react'
import PropTypes from "prop-types";
import { isEmail, isPassword } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").loginBox;

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput, PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from '../../atoms/socialNetworksButtons/socialNetworksButtons';
import { ForgotPassword, Register } from '../../atoms/loginHelpers/loginHelpers';
import Divider from '../../atoms/divider/divider';

const LoginBox = (props) => {
    const [values, setValues] = useState({
        password: "",
        email: "",
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleLogin = () => {
        alert("Login exitoso (redirigir a perfil de usuario)")
    };

    const handleRedirect = () => {
        router.push("/registrarme")
    }

    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <FormPaper title={lang.title}>
            <TextInput
                label={lang.emailInput}
                name="email"
                value={values.email}
                onChange={handleChange("email")}
            />

            <PasswordInput
                label={lang.passwordInput}
                name="password"
                value={values.password}
                onChange={handleChange("password")}
            />

            <ForgotPassword text={lang.forgotPassword} />

            <CustomButton
                text={lang.buttonText}
                onClick={props.handleLogin || handleLogin}
                disabled={!isEmail(values.email) || !isPassword(values.password)}
            />

            <Divider />

            <SocialNetworksButtons />

            <Register
                text={lang.register.text}
                boldText={lang.register.boldText}
                // redirectTo={lang.register.redirectTo}
                handleRedirect={props.handleRedirect || handleRedirect}
            />
        </FormPaper>
    )
}

LoginBox.propTypes = {
    handleLogin: PropTypes.func,
    handleRedirect: PropTypes.func,
};

export default LoginBox;
