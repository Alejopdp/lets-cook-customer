// Utils & config
import React from "react";

// External components
import {FormControlLabel, Checkbox} from '@material-ui/core';
import { RadioButtonUnchecked as CircleUnchecked , CheckCircle as CircleCheckedFilled} from '@material-ui/icons';

// Internal components
import { RoundedCheckboxProps } from './interfaces';

export const RoundedCheckbox = (props: RoundedCheckboxProps) => {

    return (
        <FormControlLabel
            control={
                <Checkbox
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                    color="primary"
                    name={props.name}
                    checked={props.checked}
                    onChange={props.onChange}
                />
            }
            label={
                props.label
            }
        />
    );
};

export default RoundedCheckbox;
