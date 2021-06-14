// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { isEmail } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").mailStep;

// External components
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from "../../atoms/socialNetworksButtons/socialNetworksButtons";
import { AcceptLegalTerms } from "../../atoms/loginHelpers/loginHelpers";
import Divider from "../../atoms/divider/divider";

const MailStep = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <TextInput
                label={lang.emailInput}
                name="email"
                value={props.email}
                onChange={props.handleChange}
            />

            <CustomButton
                disabled={!isEmail(props.email)}
                text={lang.buttonText}
                onClick={() => props.handleSubmit(1)}
            />

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
