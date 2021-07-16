import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
        marginTop: "0.5rem",
    },
}));

export default function SimpleSelect() {
    const classes = useStyles();
    const theme = useTheme();
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(3) }}>
            <InputLabel htmlFor="outlined-age-native-simple">Idioma de Preferencia</InputLabel>
            <Select
                native
                value=""
                onChange={handleChange}
                label="Idioma de Preferencia"
                // inputProps={{ name: "planId", id: "outlined-age-native-simple" }}
            >
                <option key="1" value="" disabled></option>
                <option key="1" value="Español">
                    Español
                </option>
                <option key="2" value="Ingles">
                    Ingles
                </option>
            </Select>
        </FormControl>
    );
}
