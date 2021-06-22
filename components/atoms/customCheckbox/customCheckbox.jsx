// Utils & Config
import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// External components
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: theme.spacing(1.5)
  }
}));

const CustomCheckbox = ({ className, name, checked, onChange, color, label, redirectTo, boldText }) => {
  const { form } = useStyles();

  return (
    <FormGroup row>
      <FormControlLabel
        className={className || form}
        control={
          <Checkbox
            name={name}
            checked={checked}
            onChange={onChange}
            color={color || "primary"}
          />
        }
        label={
          <Typography variant="body2">
            {label}
            {redirectTo &&
              <Link href={redirectTo}>
                <b> {boldText}</b>
              </Link>
            }
          </Typography>
        }
      />
    </FormGroup>
  );
}

export default CustomCheckbox;

CustomCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  redirectTo: PropTypes.string,
  boldText: PropTypes.string,
}