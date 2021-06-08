// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from "../../atoms/socialNetworksButtons/socialNetworksButtons";
import { AcceptLegalTerms } from "../../atoms/loginHelpers/loginHelpers";
import Divider from "../../atoms/divider/divider";

const MailStep = (props) => {
    return (
        <>
            <TextInput label="Ingrese su correo electrónico" name="email" value={props.email} onChange={props.handleChange} />

            <CustomButton text="Continuar" onClick={() => props.handleSubmit(1)} />

            <Divider />

            <SocialNetworksButtons />

            <AcceptLegalTerms />
        </>
    );
};

MailStep.propTypes = {
    email: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default MailStep;
