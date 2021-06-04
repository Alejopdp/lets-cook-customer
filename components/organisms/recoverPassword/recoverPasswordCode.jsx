// Utils & Config
import React from 'react'

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { Register } from '../../atoms/loginHelpers/loginHelpers';

const RecoverPasswordCode = () => {
    const [values, setValues] = React.useState({
        code: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        console.log("Submit")
    };

    return (
        <FormPaper
            fullWidth
            title="Recuperar contraseña"
            paragraph="Te hemos enviado un correo electrónico con un código de 6 dígitos. Ingresa el código a continuación para ingresar una nueva contraseña:"
        >
            <TextInput
                label="Código de 6 dígitos"
                name="code"
                value={values.code}
                onChange={handleChange("code")}
            />

            <CustomButton
                text={"Continuar"}
                disabled={values.code.length === 6 ? false : true}
                onClick={handleSubmit}
            />

            <Register text="¿Aún no tienes cuenta?" boldText="Registrate aquí" redirectTo="/signup" />
        </FormPaper>
    )
}

export default RecoverPasswordCode;
