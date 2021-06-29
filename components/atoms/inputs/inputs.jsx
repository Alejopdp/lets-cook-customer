// Utils & Config
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: theme.spacing(2),
        width: "100%",
    },
    border: {
        borderRadius: theme.spacing(2)
    }
}));

export const TextInput = (props) => {
    const { textField, border } = useStyles();

    return (
        <FormControl variant="outlined" className={textField}>
            <InputLabel>{props.label}</InputLabel>
            <OutlinedInput
                className={border}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                labelWidth={props.labelWidth || 210}
            />
        </FormControl>
    )
};

export const PasswordInput = (props) => {
    const { textField, border } = useStyles();

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    return (
        <FormControl variant="outlined" className={textField}>
            <InputLabel>{props.label}</InputLabel>
            <OutlinedInput
                className={border}
                type={values.showPassword ? 'text' : 'password'}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={props.labelWidth || 160}
            />
        </FormControl>
    )
};

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    labelWidth: PropTypes.number,
};

PasswordInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    labelWidth: PropTypes.number,
};