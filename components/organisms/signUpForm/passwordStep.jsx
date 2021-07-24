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
import { Grid, useTheme } from "@material-ui/core"
import { RoundedButton } from '@atoms';

const PasswordStep = (props) => {
    const router = useRouter();
    const theme = useTheme();
    const lang = langs[router.locale];

    return (
        <>
            <SocialNetworksButtons />
            <Divider />
            <Grid item xs={12}>
                <PasswordInput
                    label={lang.passwordInput}
                    name="password"
                    value={props.password}
                    onChange={props.handleChange}
                    labelWidth={200}
                    helperText='La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 número'
                />
            </Grid>
            <Grid item xs={12}>
                <CustomCheckbox
                    name="authorize"
                    checked={props.authorize}
                    onChange={props.handleChange}
                    label={lang.authorizeCheckbox.label}
                    boldText={lang.authorizeCheckbox.boldText}
                    redirectTo={lang.authorizeCheckbox.redirectTo}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomCheckbox
                    name="sendInfo"
                    checked={props.sendInfo}
                    onChange={props.handleChange}
                    label={lang.infoCheckbox.label}
                    boldText={lang.infoCheckbox.boldText}
                    redirectTo={lang.infoCheckbox.redirectTo}
                />
            </Grid>
            <Grid item xs={12} style={{ marginTop: theme.spacing(2) }}>
                <RoundedButton disabled={!props.authorize || !isPassword(props.password)} label={lang.buttonText} onClick={props.handleSubmit} style={{ width: '100%' }} />
            </Grid>
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
