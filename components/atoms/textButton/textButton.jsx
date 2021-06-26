// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

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
        "&:hover": {
            backgroundColor: theme.palette.background.paper,
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
    const classes = useStyles();
    let onlyIcon = false;
    let content = (
        <Button size="small" className={classes.textButton} style={props.style}>
            {props.icon === "plus-circle-outline" ? (
                <AddCircleOutlineIcon style={!onlyIcon ? { marginRight: "6px" } : null} />
            ) : props.icon === "settings" ? (
                <SettingsIcon style={!onlyIcon ? { marginRight: "6px" } : null} />
            ) : props.icon === "time" ? (
                <RestoreIcon style={!onlyIcon ? { marginRight: "6px" } : null} />
            ) : null}
            {props.btnText}
        </Button>
    );

    if (process.browser) {
        if (window.innerWidth < 500) {
            onlyIcon = true;
        }
    }

    if (onlyIcon && props.icon) {
        content = (
            <IconButton>
                {props.icon === "plus-circle-outline" ? (
                    <AddCircleOutlineIcon style={!onlyIcon ? { marginRight: "6px" } : null} />
                ) : props.icon === "settings" ? (
                    <SettingsIcon style={!onlyIcon ? { marginRight: "6px" } : null} />
                ) : props.icon === "time" ? (
                    <RestoreIcon style={!onlyIcon ? { marginRight: "6px" } : null} />
                ) : null}
            </IconButton>
        );
    }

    return content;
};

TextButton.propTypes = {
    btnText: PropTypes.string.isRequired,
};

export default TextButton;
