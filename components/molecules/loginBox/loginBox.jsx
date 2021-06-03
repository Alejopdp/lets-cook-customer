// Utils & Config
import React from 'react'

// External components
import Typography from '@material-ui/core/Typography';

// Internal components
import FormPaper from "../formPaper/formPaper";
import { TextInput, PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from '../../atoms/socialNetworksButtons/socialNetworksButtons';
import { ForgotPassword, Register } from '../../atoms/loginHelpers/loginHelpers';
import Divider from '../../atoms/divider/divider';

const LoginBox = () => {
    const [values, setValues] = React.useState({
        password: '',
        email: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        console.log("Submit")
    };

    console.log(values)

    return (
        <FormPaper fullWidth title="Ingresa con tu cuenta">
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
            />

            <Divider />

            <SocialNetworksButtons />

            <Register text="¿Aún no tienes cuenta?" boldText="Registrate aquí" />
        </FormPaper>
    )
}

export default LoginBox;
