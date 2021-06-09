// Utils & Config
import React from 'react'
import PropTypes from "prop-types";
import { isPassword } from '../../../helpers/regex/regex';

// Internal components
import { PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from '../../atoms/socialNetworksButtons/socialNetworksButtons';
import Divider from '../../atoms/divider/divider';
import CustomCheckbox from '../../atoms/customCheckbox/customCheckbox';

const PasswordStep = (props) => {
    return (
        <>
            <PasswordInput
                label="Ingrese su contraseña"
                name="password"
                value={props.password}
                onChange={props.handleChange}
            />

            <CustomCheckbox
                name="authorize"
                checked={props.authorize}
                onChange={props.handleChange}
                label="Autorizo a Let's Cook a tratar mis datos para poder gestionar el alta como usuario en su web. Puedes obtener más información"
                boldText="pulsando aquí."
                redirectTo={"/aviso-legal"}
            />

            <CustomCheckbox
                name="sendInfo"
                checked={props.sendInfo}
                onChange={props.handleChange}
                label="Quiero recibir información por correo electrónico sobre los productos de Let's Cook y cualquier otra información que pudiera ser de mi interés como promociones y ofertas. Puedes obtener mas información"
                boldText="pulsando aquí."
                redirectTo={"/aviso-legal"}
            />

            <CustomButton
                disabled={!props.authorize || !isPassword(props.password)}
                text={"Ingresar"}
                onClick={props.handleSubmit}
            />

            <Divider />

            <SocialNetworksButtons />
        </>
    )
}

PasswordStep.propTypes = {
    password: PropTypes.string.isRequired,
    authorize: PropTypes.bool.isRequired,
    sendInfo: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default PasswordStep;
