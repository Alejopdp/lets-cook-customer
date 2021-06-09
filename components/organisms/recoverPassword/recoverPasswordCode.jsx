// Utils & Config
import React from 'react'
import PropTypes from "prop-types";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { Register } from '../../atoms/loginHelpers/loginHelpers';

const RecoverPasswordCode = (props) => {
    return (
        <FormPaper
            fullWidth
            title="Recuperar contraseña"
            paragraph="Te hemos enviado un correo electrónico con un código de 6 dígitos. Ingresa el código a continuación para ingresar una nueva contraseña:"
        >
            <TextInput
                label="Código de 6 dígitos"
                name="code"
                value={props.value}
                onChange={props.handleChange}
            />

            <CustomButton
                text={"Continuar"}
                disabled={props.value.length !== 6}
                onClick={() => props.handleSubmit(1)}
            />

            <Register text="¿Aún no tienes cuenta?" boldText="Registrate aquí" redirectTo="/registrarme" />
        </FormPaper>
    )
}

RecoverPasswordCode.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

export default RecoverPasswordCode;
