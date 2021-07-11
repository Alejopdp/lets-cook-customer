import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
    },
}));

export default function DatePicker() {
    const classes = useStyles();

    return (
        <TextField
            id="date"
            label="Fecha de Nacimiento"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
        />
    );
}
