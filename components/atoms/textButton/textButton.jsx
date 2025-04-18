// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme, useMediaQuery, Button, IconButton, Icon } from "@material-ui/core";

// External components
import {
    AddCircleOutline as AddCircleOutlineIcon,
    Settings as SettingsIcon,
    Restore as RestoreIcon,
    Star as StarIcon,
    AttachMoney as WalletIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    textButton: {
        padding: "0px",
        fontSize: "14px",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
}));

const TextButton = (props) => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    return isSmDown && props.icon ? (
        <IconButton size="small" style={props.style} onClick={props.handleClick}>
            {props.icon === "plus-circle-outline" ? (
                <AddCircleOutlineIcon style={!isSmDown ? { marginRight: "6px" } : { color: theme.palette.text.primary }} />
            ) : props.icon === "settings" ? (
                <SettingsIcon />
            ) : props.icon === "time" ? (
                <RestoreIcon />
            ) : props.icon === "star" ? (
                <StarIcon />
            ) : props.icon === "wallet" ? (
                <WalletIcon />
            ) : null}
        </IconButton>
    ) : (
        <Button
            size="small"
            className={classes.textButton}
            variant="text"
            style={props.style}
            onClick={() => props.handleClick()}
            disabled={props.disabled}
            startIcon={props.startIcon}
        >
            {props.icon === "plus-circle-outline" ? (
                <AddCircleOutlineIcon style={!isSmDown ? { marginRight: "6px" } : { color: theme.palette.text.primary }} />
            ) : props.icon === "settings" ? (
                <SettingsIcon />
            ) : props.icon === "time" ? (
                <RestoreIcon />
            ) : props.icon === "star" ? (
                <StarIcon />
            ) : props.icon === "wallet" ? (
                <WalletIcon />
            ) : null}
            {props.btnText}
        </Button>
    );
};

TextButton.propTypes = {
    btnText: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    style: PropTypes.object
};

export default TextButton;
