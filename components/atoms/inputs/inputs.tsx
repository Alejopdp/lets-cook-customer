// Utils & Config
import React from 'react'
import { useStyles } from "./styles";
import { TextInputProps, PasswordInputProps } from './interfaces';

// External components
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const TextInput = (props: TextInputProps) => {
    const { textField, border } = useStyles();

    return (
        <FormControl variant="outlined" className={textField}>
            <InputLabel>{props.label}</InputLabel>
            <OutlinedInput
                className={border}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                labelWidth={props.labelWidth || 210}
            />
        </FormControl>
    )
};

export const PasswordInput = (props: PasswordInputProps) => {
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