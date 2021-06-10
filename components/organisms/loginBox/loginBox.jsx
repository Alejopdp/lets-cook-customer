// Utils & Config
import React, { useState } from 'react'
import { emailRegex, pswRegex } from "../../../helpers/regex/regex";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput, PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from '../../atoms/socialNetworksButtons/socialNetworksButtons';
import { ForgotPassword, Register } from '../../atoms/loginHelpers/loginHelpers';
import Divider from '../../atoms/divider/divider';

const LoginBox = () => {
    const [values, setValues] = useState({
        password: "",
        email: "",
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        console.log("Submit")
    };

    const isEmail = emailRegex.test(values.email);
    const isPassword = pswRegex.test(values.password);

    console.log(values)

    return (
        <FormPaper title="Ingresa con tu cuenta">
            <TextInput
                label="Ingrese su correo electrónico"
                name="email"
                value={values.email}
                onChange={handleChange("email")}
            />

            <PasswordInput
                label="Ingrese su contraseña"
                name="password"
                value={values.password}
                onChange={handleChange("password")}
            />

            <ForgotPassword text="Olvidé mi contraseña"/>

            <CustomButton
                text={"Ingresar"}
                onClick={handleSubmit}
                disabled={!isEmail || !isPassword}
            />

            <Divider />

            <SocialNetworksButtons />

            <Register
                text="¿Aún no tienes cuenta?"
                boldText="Registrate aquí"
                redirectTo="/registrarme"
            />
        </FormPaper>
    )
}

export default LoginBox;
