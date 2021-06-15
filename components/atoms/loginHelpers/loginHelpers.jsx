// Utils & Config
import React from 'react';
import useStyles from "./styles";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").acceptLegalTerms;

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

export const Register = ({ redirectTo, handleRedirect, text, boldText }) => {
    const { register, btn } = useStyles();
    return (
        // <Link href={redirectTo}>
            <Button className={btn} onClick={handleRedirect}>
                    <ExitToAppIcon />
                    <Typography variant="body1" className={register}>
                        {text} <b>{boldText}</b>
                    </Typography>
            </Button>
        // </Link>
    )
}

export const AcceptLegalTerms = () => {
    const { margin, link } = useStyles();

    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Typography variant="body2" className={margin}>
            {lang.continuing}
            <Link href="/aviso-legal" className={link}>
                <b> {lang.terms} </b>
            </Link>
            {lang.and}
            <Link href="/aviso-legal" className={link}>
                <b> {lang.politics}</b>
            </Link>
        </Typography>
    )
}

ForgotPassword.propTypes = {
    text: PropTypes.string.isRequired
};

Register.propTypes = {
    // redirectTo: PropTypes.string.isRequired,
    handleRedirect: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    boldText: PropTypes.string.isRequired
};