// Utils & Config
import React from 'react';
import useStyles from "./styles";
import PropTypes from "prop-types";

// External components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Icons & Images
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const ForgotPassword = ({ text }) => {
    return (
        <Typography variant="subtitle2" color="primary">
            {text}
        </Typography>
    )
}

export const Register = ({ text, boldText }) => {
    const { register, btn } = useStyles();
    return (
        <Button className={btn}>
            <ExitToAppIcon />
            <Typography variant="body1" className={register}>
                {text} <b>{boldText}</b>
            </Typography>
        </Button>
    )
}

ForgotPassword.propTypes = {
    text: PropTypes.string.isRequired
};

Register.propTypes = {
    text: PropTypes.string.isRequired,
    boldText: PropTypes.string.isRequired
};