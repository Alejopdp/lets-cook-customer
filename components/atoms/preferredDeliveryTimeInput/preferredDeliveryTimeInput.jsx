import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useLang } from "../../../hooks";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

const SCHEDULE_OPTIONS = [
    { value: " ", label: { es: "Sin indicar", ca: "Sin indicar", en: "No option" } },
    { value: "15 - 18", label: { es: "de 15 a 18 hs", ca: "de 15 a 18 hs", en: "3 to 6 pm" } },
    { value: "17 - 20", label: { es: "de 17 a 20 hs", ca: "de 17 a 20 hs", en: "5 to 8 pm" } },
    { value: "19 - 22", label: { es: "de 19 a 22 hs", ca: "de 19 a 22 hs", en: "7 to 10 pm" } },
];

export default function PreferredDeliveryTimeInput(props) {
    const classes = useStyles();
    const router = useRouter();
    const [lang] = useLang("configuracion");

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
                <option key="0" value={SCHEDULE_OPTIONS[0].value}>
                    {SCHEDULE_OPTIONS[0].label[router.locale]}
                </option>
                <option key="1" value={SCHEDULE_OPTIONS[1].value}>
                    {SCHEDULE_OPTIONS[1].label[router.locale]}
                </option>
                <option key="2" value={SCHEDULE_OPTIONS[2].value}>
                    {SCHEDULE_OPTIONS[2].label[router.locale]}
                </option>
                <option key="3" value={SCHEDULE_OPTIONS[3].value}>
                    {SCHEDULE_OPTIONS[3].label[router.locale]}
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
