// Utils & Config
import React from 'react'
import { pswRegex } from "../../../helpers/regex/regex";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { Register } from '../../atoms/loginHelpers/loginHelpers';

const RecoverPassword = () => {
    const [values, setValues] = React.useState({
        password: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        console.log("Submit")
    };

    const isPassword = pswRegex.test(values.password);

    return (
        <FormPaper
            fullWidth
            title="Recuperar contraseña"
            paragraph="El código ingresasdo es válido. Ingrese a continuación su nueva contraseña:"
        >
            <PasswordInput
                label="Ingrese su contraseña"
                name="password"
                value={values.password}
                onChange={handleChange("password")}
            />

            <CustomButton
                text={"Recuperar contraseña"}
                disabled={ isPassword ? false : true }
                onClick={handleSubmit}
            />

            <Register text="¿Aún no tienes cuenta?" boldText="Registrate aquí" />
        </FormPaper>
    )
}

export default RecoverPassword;
