// Utils & Config
import React from 'react';
import useStyles from "./styles";
import PropTypes from "prop-types";

// External components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

// Icons & Images
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const ForgotPassword = ({ text }) => {
    return (
        <Link href="/recuperar-contrasena">
            <Typography variant="subtitle2" color="primary">
                {text}
            </Typography>
        </Link>
    )
}

export const Register = ({ redirectTo, text, boldText }) => {
    const { register, btn } = useStyles();
    return (
        <Link href={redirectTo}>
            <Button className={btn}>
                    <ExitToAppIcon />
                    <Typography variant="body1" className={register}>
                        {text} <b>{boldText}</b>
                    </Typography>
            </Button>
        </Link>
    )
}

export const AcceptLegalTerms = () => {
    const { margin, link } = useStyles();
    return (
        <Typography variant="body2" className={margin}>
            Al continuar, aceptas los
            <Link href="/aviso-legal" className={link}>
                <b> términos y condiciones </b>
            </Link>
            y la
            <Link href="/aviso-legal" className={link}>
                <b> política de privacidad.</b>
            </Link>
        </Typography>
    )
}

ForgotPassword.propTypes = {
    text: PropTypes.string.isRequired
};

Register.propTypes = {
    redirectTo: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    boldText: PropTypes.string.isRequired
};