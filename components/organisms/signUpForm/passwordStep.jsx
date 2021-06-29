// Utils & Config
import React from 'react'
import PropTypes from "prop-types";
import { isPassword } from '../../../helpers/regex/regex';
import { useRouter } from "next/router";
const langs = require("../../../lang").passwordStep;

// Internal components
import { PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from '../../atoms/socialNetworksButtons/socialNetworksButtons';
import Divider from '../../atoms/divider/divider';
import CustomCheckbox from '../../atoms/customCheckbox/customCheckbox';

const PasswordStep = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <PasswordInput
                label={lang.passwordInput}
                name="password"
                value={props.password}
                onChange={props.handleChange}
            />

            <CustomCheckbox
                name="authorize"
                checked={props.authorize}
                onChange={props.handleChange}
                label={lang.authorizeCheckbox.label}
                boldText={lang.authorizeCheckbox.boldText}
                redirectTo={lang.authorizeCheckbox.redirectTo}
            />

            <CustomCheckbox
                name="sendInfo"
                checked={props.sendInfo}
                onChange={props.handleChange}
                label={lang.infoCheckbox.label}
                boldText={lang.infoCheckbox.boldText}
                redirectTo={lang.infoCheckbox.redirectTo}
            />

            <CustomButton
                disabled={!props.authorize || !isPassword(props.password)}
                text={lang.buttonText}
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
