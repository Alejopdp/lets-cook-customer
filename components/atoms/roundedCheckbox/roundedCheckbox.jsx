// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

// External components
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { Typography } from "@material-ui/core";

// Internal components

const RoundedCheckbox = (props) => {
    const theme = useTheme();

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
                // <Typography variant="body1">
                    props.label
                // </Typography>
            }
        />
    );
};

RoundedCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default RoundedCheckbox;
