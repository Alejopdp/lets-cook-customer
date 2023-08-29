import * as React from "react";
import { InputAdornment, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import { AccessTime } from "@material-ui/icons";

type WrappedTimePickerProps = {
    label: string;
    value: any;
    onChange: (newValue: any) => void;
};

export default function WrappedTimePicker(props: WrappedTimePickerProps) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <TimePicker
                // InputProps={{
                //     startAdornment: (
                //         <InputAdornment position="start">
                //             <AccessTime fontSize={"inherit"} />
                //         </InputAdornment>
                //     ),
                // }}
                ampm={false} // Esto asegura el formato de 24 horas
                label="Horario de carga"
                value={props.value}
                onChange={props.onChange}
                TextFieldComponent={TextField}
                inputVariant="outlined"
                minutesStep={5}
                fullWidth
            />
        </MuiPickersUtilsProvider>
    );
}
