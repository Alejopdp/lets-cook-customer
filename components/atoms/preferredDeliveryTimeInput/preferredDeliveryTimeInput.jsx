import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { useLang } from "../../../hooks";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

export default function PreferredDeliveryTimeInput(props) {
    const classes = useStyles();
    const [lang] = useLang("preferredDeliveryTimeInput");

    const scheduleOptions = [
        { value: "8 - 12", label: "De 8 a 12 hs" },
        { value: "12 - 16", label: "De 12 a 16 hs" },
        { value: "16 - 20", label: "De 16 a 20 hs" },
    ];

    return (
        <FormControl variant="outlined" className={classes.container} fullWidth>
            <InputLabel htmlFor="outlined-age-native-simple">Horario de preferencia de entrega</InputLabel>
            <Select
                fullWidth
                native
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                label="Horario de preferencia de entrega"
                inputProps={{ name: props.name }}
            >
                <option key="0" value="" disabled></option>
                <option key="1" value={scheduleOptions[0].value}>
                    {scheduleOptions[0].label}
                </option>
                <option key="2" value={scheduleOptions[1].value}>
                    {scheduleOptions[1].label}
                </option>
                <option key="3" value={scheduleOptions[2].value}>
                    {scheduleOptions[2].label}
                </option>
            </Select>
        </FormControl>
    );
}

// <Select
//     name={props.name}
//     label="Horario de preferencia de entrega"
//     value={props.value}
//     handleChange={props.handleChange}
//     options={scheduleOptions}
// />
PreferredDeliveryTimeInput.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleChange: PropTypes.handleChange,
};
