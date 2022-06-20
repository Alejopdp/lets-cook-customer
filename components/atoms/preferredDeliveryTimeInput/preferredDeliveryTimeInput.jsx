import React from "react";
import PropTypes from "prop-types";
import { makeStyles, InputLabel, FormControl, Select } from "@material-ui/core";
import { useLang } from "../../../hooks";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

export default function PreferredDeliveryTimeInput(props) {
    const classes = useStyles();
    const router = useRouter();
    const [lang] = useLang("configuracion");

    const scheduleOptions = [
        { value: " ", label: { es: "Sin indicar", ca: "Sin indicar", en: "No option" } },
        { value: "15 - 18", label: { es: "de 15 a 18 hs", ca: "de 15 a 18 hs", en: "3 to 6 pm" } },
        { value: "17 - 20", label: { es: "de 17 a 20 hs", ca: "de 17 a 20 hs", en: "5 to 8 pm" } },
        { value: "19 - 22", label: { es: "de 19 a 22 hs", ca: "de 19 a 22 hs", en: "7 to 10 pm" } },
    ];

    return (
        <FormControl variant="outlined" className={classes.container} fullWidth>
            <InputLabel htmlFor="preferred-hour-input">{lang.userInfoDetail.deliveryAddressModal.preferredHour}</InputLabel>
            <Select
                labelId="preferred-hour-input"
                fullWidth
                native
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                label={lang.userInfoDetail.deliveryAddressModal.preferredHour}
                inputProps={{ name: props.name }}
            >
                <option key="0" value={scheduleOptions[0].value}>
                    {scheduleOptions[0].label[router.locale]}
                </option>
                <option key="1" value={scheduleOptions[1].value}>
                    {scheduleOptions[1].label[router.locale]}
                </option>
                <option key="2" value={scheduleOptions[2].value}>
                    {scheduleOptions[2].label[router.locale]}
                </option>
                <option key="3" value={scheduleOptions[3].value}>
                    {scheduleOptions[3].label[router.locale]}
                </option>
            </Select>
        </FormControl>
    );
}

PreferredDeliveryTimeInput.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleChange: PropTypes.handleChange,
};
