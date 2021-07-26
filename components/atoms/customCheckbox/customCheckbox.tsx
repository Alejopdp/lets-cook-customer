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
import { useStyles } from './styles';
import { CustomCheckboxProps } from './interfaces';

export const CustomCheckbox = (props: CustomCheckboxProps) => {
  const { form } = useStyles();

  return (
    <FormGroup row>
      <FormControlLabel
        className={props.className || form}
        control={
          <Checkbox
            name={props.name}
            checked={props.checked}
            onChange={props.onChange}
            color={props.color || "primary"}
          />
        }
        label={
          <Typography variant="body2" style={{ fontSize: '14px' }}>
            {props.label}
            {props.redirectTo &&
              <Link href={props.redirectTo}>
                <b> {props.boldText}</b>
              </Link>
            }
          </Typography>
        }
      />
    </FormGroup>
  );
}

export default CustomCheckbox;