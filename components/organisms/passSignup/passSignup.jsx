// Utils & Config
import React from 'react'

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from '../../atoms/socialNetworksButtons/socialNetworksButtons';
import { Register } from '../../atoms/loginHelpers/loginHelpers';
import Divider from '../../atoms/divider/divider';
import CustomCheckbox from '../../atoms/customCheckbox/customCheckbox';

const PassSignup = () => {
    const [values, setValues] = React.useState({
        authorize: false,
        sendInfo: false,
        password: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value || event.target.checked });
    };

    const handleSubmit = () => {
        console.log("Submit")
    };

    console.log(values)

    return (
        <FormPaper title="Crear tu cuenta">
            <PasswordInput
                label="Ingrese su contraseña"
                name="password"
                value={values.password}
                onChange={handleChange("password")}
            />

            <CustomCheckbox
                name="authorize"
                checked={values.authorize}
                onChange={handleChange("authorize")}
                label="Autorizo a Let's Cook a tratar mis datos para poder gestionar el alta como usuario en su web. Puedes obtener más información"
                boldText="pulsando aquí."
                redirectTo={"/aviso-legal"}
            />

            <CustomCheckbox
                name="sendInfo"
                checked={values.sendInfo}
                onChange={handleChange("sendInfo")}
                label="Quiero recibir información por correo electrónico sobre los productos de Let's Cook y cualquier otra información que pudiera ser de mi interés como promociones y ofertas. Puedes obtener mas información"
                boldText="pulsando aquí."
                redirectTo={"/aviso-legal"}
            />

            <CustomButton
                disabled={values.authorize === true ? false : true }
                text={"Ingresar"}
                onClick={handleSubmit}
            />

            <Divider />

            <SocialNetworksButtons />

            <Register text="¿Ya tienes cuenta?" boldText="Ingresa aquí" redirectTo="/ingresar" />
        </FormPaper>
    )
}

export default PassSignup;
