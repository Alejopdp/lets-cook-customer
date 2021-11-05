// Utils & Config
import React from "react";
import { useStyles } from "./styles";
import { TextInputProps, PasswordInputProps } from "./interfaces";

// External components
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Typography from "@material-ui/core/Typography";

export const TextInput = (props: TextInputProps) => {
    const { textField, border } = useStyles();

    const labelRef = React.useRef();
    const labelWidth = labelRef.current ? labelRef.current.clientWidth : 220;

    return (
        <FormControl variant="outlined" className={textField}>
            <InputLabel ref={labelRef} style={{ fontSize: "16px" }}>
                {props.label}
            </InputLabel>
            <OutlinedInput
                style={{ fontSize: "16px" }}
                className={border}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                labelWidth={labelWidth}
                inputProps={{ ...props.inputsProps }}
                disabled={props.disabled}
            />
        </FormControl>
    );
};

export const PasswordInput = (props: PasswordInputProps) => {
    const { textField, border } = useStyles();

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const labelRef = React.useRef();
    const labelWidth = labelRef.current ? labelRef.current.clientWidth : 175;

    return (
        <FormControl variant="outlined" className={textField}>
            <InputLabel ref={labelRef} style={{ fontSize: "16px" }}>
                {props.label}
            </InputLabel>
            <OutlinedInput
                style={{ fontSize: "16px" }}
                className={border}
                type={values.showPassword ? "text" : "password"}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                endAdornment={
                    <InputAdornment position="end" style={{ padding: "8px" }}>
                        <IconButton onClick={handleClickShowPassword} edge="end">
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={labelWidth}
            />
            {props.helperText && (
                <Typography variant="caption" color={props.hasError ? "error" : "textPrimary"} style={{ marginTop: "4px" }}>
                    {props.helperText}
                </Typography>
            )}
        </FormControl>
    );
};
