import clsx from "clsx";
import { ButtonBase, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import { RoundedButtonProps } from "./interfaces";
import CircularProgress from "@material-ui/core/CircularProgress";

export const RoundedButton = ({ variant = "content", label, children: Component, style, ...props }: RoundedButtonProps) => {
    const classes = useStyles();

    return (
        <ButtonBase
            disabled={props.disabled}
            focusRipple
            className={clsx(
                classes.default,
                classes.loginButton,
                { [classes.outlineBorder]: variant === "outline" },
                { [classes.contentBackground]: variant === "content" }
            )}
            style={{ ...style }}
            {...props}
        >
            <div style={{ marginRight: 4 }}>{Component}</div>
            <Typography
                variant="button"
                style={{ display: "flex", alignItems: "center", ...props.textStyle }}
                className={clsx({ [classes.contentTypography]: variant === "content" })}
            >
                {label}
                {props.isLoading && <CircularProgress size={16} style={{ marginLeft: "8px", color: "white" }} />}
            </Typography>
        </ButtonBase>
    );
};

export default RoundedButton;
