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

const PreferredDeliveryTimeInput = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const timeOptions = [
        { value: '10to12', label: 'De 10 a 12 hs' },
        { value: '12to14', label: 'De 12 a 14 hs' },
        { value: '14to16', label: 'De 14 a 16 hs' },
        { value: '16to18', label: 'De 16 a 18 hs' }
    ]

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Horario de preferencia de entrega</InputLabel>
            <Select
                native
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                label="Horario de preferencia de entrega"
                inputProps={{ name: props.name }}
            >
                <option key="0" value="" disabled></option>
                {timeOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}

export default PreferredDeliveryTimeInput