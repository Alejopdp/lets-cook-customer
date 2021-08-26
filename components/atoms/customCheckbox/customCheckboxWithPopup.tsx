// Utils & Config
import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// External components
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography, useTheme } from '@material-ui/core';
import Link from "next/link";
import { useStyles } from './styles';
import { CustomCheckboxWithPopupProps } from './interfaces';

export const CustomCheckboxWithPopup = (props: CustomCheckboxWithPopupProps) => {
  const theme = useTheme();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        checked={props.checked}
        onChange={props.onChange}
        color={props.color || "primary"}
        name={props.name}
      />
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ fontSize: "13px", marginLeft: theme.spacing(0.5) }}
      >
        {props.label}
        <b onClick={props.handleOpenModal} style={{ cursor: "pointer" }}>
          {props.boldText}
        </b>
      </Typography>
    </div>
  );
}

export default CustomCheckboxWithPopup;