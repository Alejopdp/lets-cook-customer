// Utils & Config
import React from 'react';
import { emailRegex } from "../../../helpers/regex/regex";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { Register } from '../../atoms/loginHelpers/loginHelpers';

const RecoverPasswordMail = (props) => {
    // const [values, setValues] = React.useState({
    //     email: '',
    // });

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    // const handleSubmit = () => {
    //     console.log("Submit")
    // };

    // const isEmail = emailRegex.test(values.email);

    return (
        <FormPaper
            fullWidth
            title="Recuperar contraseña"
        >
            <TextInput
                label="Ingrese su correo electrónico"
                name="email"
                value={props.value}
                onChange={props.handleChange}
            />

            <CustomButton
                text={"Recuperar contraseña"}
                onClick={props.handleSubmit}
            />

            <Register text="¿Aún no tienes cuenta?" boldText="Registrate aquí" redirectTo="/signup" />
        </FormPaper>
    )
}

export default RecoverPasswordMail;
