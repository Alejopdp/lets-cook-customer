import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "0.6rem",
        marginLeft: "-.5rem",
        width: "106%",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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
                variant="outlined"
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
