import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
    },
}));

export default function DatePicker(props) {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                label={props.label}
                type="date"
                value={props.value}
                onChange={props.handleChange}
                name={props.name}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    value: props.value,
                }}
                variant="outlined"
                placeholder="dd/mm/yyyy"
            />
        </form>
    );
}

DatePicker.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};
