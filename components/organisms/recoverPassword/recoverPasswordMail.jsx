// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { isEmail } from "../../../helpers/regex/regex";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import { Register } from "../../atoms/loginHelpers/loginHelpers";

const RecoverPasswordMail = (props) => {
    return (
        <FormPaper fullWidth title="Recuperar contraseña">
            <TextInput
                label="Ingrese su correo electrónico"
                name="email"
                value={props.value}
                onChange={props.handleChange}
            />

            <CustomButton
                text={"Recuperar contraseña"}
                onClick={() => props.handleSubmit(1)}
                disabled={!isEmail(props.value)}
            />

            <Register text="¿Aún no tienes cuenta?" boldText="Registrate aquí" redirectTo="/signup" />
        </FormPaper>
    );
};

RecoverPasswordMail.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

export default RecoverPasswordMail;
