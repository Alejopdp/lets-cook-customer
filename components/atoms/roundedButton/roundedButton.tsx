import clsx from 'clsx';
import { ButtonBase, makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { ReactElement } from 'react';
import { memo } from 'react';
import { useStyles } from './styles';
import { RoundedButtonProps } from './interfaces';

export const RoundedButton = ({ variant = "content", label, children: Component, style, ...props }: RoundedButtonProps) => {
    const classes = useStyles();

    return (
        <ButtonBase
            focusRipple
            className={clsx(
                classes.default,
                classes.loginButton,
                { [classes.outlineBorder]: variant === "outline" },
                { [classes.contentBackground]: variant === "content" },
            )}
            style={{ ...style }}
            {...props}
        >
            <div style={{ marginRight: 4 }} >
                {Component}
            </div>
            <Typography variant="button" className={clsx(
                { [classes.contentTypography]: variant === "content" }
            )}>{label}</Typography>
        </ButtonBase >
    );
};

export default RoundedButton;