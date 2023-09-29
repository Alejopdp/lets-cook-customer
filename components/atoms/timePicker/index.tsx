import * as React from "react";
import { TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";

type WrappedTimePickerProps = {
    label: string;
    value: any;
    onChange: (newValue: any) => void;
    cancelButtonText: string;
    confirmButtonText: string;
};

export default function WrappedTimePicker(props: WrappedTimePickerProps) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <TimePicker
                ampm={false} // Esto asegura el formato de 24 horas
                label={props.label}
                value={props.value}
                onChange={props.onChange}
                TextFieldComponent={TextField}
                inputVariant="outlined"
                minutesStep={5}
                fullWidth
                cancelLabel={props.cancelButtonText}
                okLabel={props.confirmButtonText}
            />
        </MuiPickersUtilsProvider>
    );
}
