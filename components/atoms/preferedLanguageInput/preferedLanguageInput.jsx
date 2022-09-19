import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useLang } from "../../../hooks";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

const SimpleSelect = (props) => {
    const classes = useStyles();
    const [lang] = useLang("simpleSelect");

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">{lang.preferenceLang}</InputLabel>
            <Select
                native
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                label={lang.preferenceLang}
                inputProps={{ name: props.name }}
            >
                <option key="0" value="" disabled></option>
                <option key="1" value="es">
                    {lang.spanish}
                </option>
                <option key="2" value="en">
                    {lang.english}
                </option>
                <option key="3" value="ca">
                    {lang.catalan}
                </option>
            </Select>
        </FormControl>
    );
};

export default SimpleSelect;
