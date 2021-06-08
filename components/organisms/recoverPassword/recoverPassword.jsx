// Utils & Config
import React from "react";
import { isPassword } from "../../../helpers/regex/regex";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { Register } from "../../atoms/loginHelpers/loginHelpers";

const RecoverPassword = (props) => {

    return (
        <FormPaper
            fullWidth
            title="Recuperar contraseña"
            paragraph="El código ingresasdo es válido. Ingrese a continuación su nueva contraseña:"
        >
            <PasswordInput label="Ingrese su contraseña" name="password" value={props.value} onChange={props.handleChange} />

            <CustomButton text={"Recuperar contraseña"} disabled={isPassword(props.password)} onClick={props.handleSubmit} />

            <Register text="¿Aún no tienes cuenta?" boldText="Registrate aquí" />
        </FormPaper>
    );
};

export default RecoverPassword;
