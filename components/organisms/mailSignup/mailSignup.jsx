// Utils & Config
import React from 'react'

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from '../../atoms/socialNetworksButtons/socialNetworksButtons';
import { Register, AcceptLegalTerms } from '../../atoms/loginHelpers/loginHelpers';
import Divider from '../../atoms/divider/divider';

const MailSignup = () => {
    const [values, setValues] = React.useState({
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
        <FormPaper title="Crear tu cuenta">
            <TextInput
                label="Ingrese su correo electrónico"
                name="email"
                value={values.email}
                onChange={handleChange("email")}
            />

            <CustomButton
                text={"Continuar"}
                onClick={handleSubmit}
            />

            <Divider />

            <SocialNetworksButtons />

            <AcceptLegalTerms />

            <Register text="¿Ya tienes cuenta?" boldText="Ingresa aquí" redirectTo="/ingresar" />
        </FormPaper>
    )
}

export default MailSignup;
