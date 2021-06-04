// Utils & Config
import React from 'react';
import { emailRegex } from "../../../helpers/regex/regex";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { Register } from '../../atoms/loginHelpers/loginHelpers';

const RecoverPasswordMail = () => {
    const [values, setValues] = React.useState({
        email: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const isEmail = emailRegex.test(values.email);

    const handleSubmit = () => {
        console.log("Submit")
    };

    return (
        <FormPaper
            fullWidth
            title="Recuperar contraseña"
        >
            <TextInput
                label="Ingrese su correo electrónico"
                name="email"
                value={values.email}
                onChange={handleChange("email")}
            />

            <CustomButton
                text={"Recuperar contraseña"}
                disabled={isEmail ? false : true}
                onClick={handleSubmit}
            />

            <Register text="¿Aún no tienes cuenta?" boldText="Registrate aquí" redirectTo="/signup" />
        </FormPaper>
    )
}

export default RecoverPasswordMail;
