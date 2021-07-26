// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";

// import clsx from "clsx";

// External components
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import RestoreIcon from "@material-ui/icons/Restore";

const useStyles = makeStyles((theme) => ({
    textButton: {
        padding: "0px",
        fontSize: "14px",
        "&:hover": {
            // backgroundColor: theme.palette.background.paper,
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

    let content = (
        <Button size="small" className={classes.textButton} style={props.style} onClick={props.handleClick}>
            {props.icon === "plus-circle-outline" ? (
                <AddCircleOutlineIcon style={!isSmDown ? { marginRight: "6px" } : null} />
            ) : props.icon === "settings" ? (
                <SettingsIcon style={!isSmDown ? { marginRight: "6px" } : null} />
            ) : props.icon === "time" ? (
                <RestoreIcon style={!isSmDown ? { marginRight: "6px" } : null} />
            ) : null}
            {props.btnText}
        </Button>
    );

    if (isSmDown && props.icon) {
        content = (
            <IconButton size="small" style={props.style} onClick={props.handleClick}>
                {props.icon === "plus-circle-outline" ? (
                    <AddCircleOutlineIcon style={!isSmDown ? { marginRight: "6px" } : { color: theme.palette.text.primary }} />
                ) : props.icon === "settings" ? (
                    <SettingsIcon style={!isSmDown ? { marginRight: "6px" } : null} />
                ) : props.icon === "time" ? (
                    <RestoreIcon style={!isSmDown ? { marginRight: "6px" } : null} />
                ) : null}
            </IconButton>
        );
    }

    return content;
};

TextButton.propTypes = {
    btnText: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
};

export default TextButton;
