import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

export default function PreferredDeliveryTimeInput(props) {
    const classes = useStyles();
    const theme = useTheme();

    const timeOptions = [
        { value: "10to12", label: "De 10 a 12 hs" },
        { value: "12to14", label: "De 12 a 14 hs" },
        { value: "14to16", label: "De 14 a 16 hs" },
        { value: "16to18", label: "De 16 a 18 hs" },
    ];

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="time"
                label="Horario de Preferencia de Entrega"
                name={props.name}
                type="time"
                defaultValue="07:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                variant="outlined"
                fullWidth
            />
        </form>
    );
}
