import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

const SimpleSelect = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Idioma de Preferencia</InputLabel>
            <Select
                native
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                label="Idioma de Preferencia"
                inputProps={{ name: props.name }}
            >
                <option key="0" value="" disabled></option>
                <option key="1" value="ES">
                    Español
                </option>
                <option key="2" value="EN">
                    Ingles
                </option>
                <option key="3" value="CA">
                    Catalán
                </option>
            </Select>
        </FormControl>
    );
}

export default SimpleSelect