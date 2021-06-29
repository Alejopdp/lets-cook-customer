// Utils & Config
import React, { useState } from "react";
import { isEmail, isPassword } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").loginBox;
import { loginWithSocialMedia } from "../../../helpers/serverRequests/customer";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput, PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from "../../atoms/socialNetworksButtons/socialNetworksButtons";
import { ForgotPassword, Register } from "../../atoms/loginHelpers/loginHelpers";
import Divider from "../../atoms/divider/divider";

const LoginBox = () => {
    const [values, setValues] = useState({
        password: "",
        email: "",
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        alert("Login exitoso (redirigir a perfil de usuario)");
    };

    const handleSocialMediaSubmit = async (token) => {
        const res = await loginWithSocialMedia(token);

        if (res.status === 200) {
            saveInLocalStorage("token", res.data.token);
            saveInLocalStorage("userInfo", res.data.userInfo);
            setUserInfo(res.data.userInfo);
            cookies.set("token", res.data.token);
            // router.push("/dashboard");
            setserverError(res.data.message);
        } else {
            alert("Error al querer ingresar");
        }
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
