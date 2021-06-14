// Utils & Config
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import { Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.paper,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(4),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
        "&:disabled": {
            backgroundColor: theme.palette.background.default
        }
    },
    slimButton: {
        padding: theme.spacing(0.5),
    },
    box: {
        display: "flex",
        flexDirection: "row",
    }
}));

const CustomButton = ({ text, icon, onClick, disabled, smallButton }) => {
    const { button, slimButton, box } = useStyles();

    return (
        <Button
            className={ smallButton ? clsx(button, slimButton) : button}
            onClick={onClick}
            disabled={disabled}
        >
            <Box className={box}>
                {icon &&
                    <Box className={box} marginRight="8px">
                        {icon}
                    </Box>
                }

                {text}
            </Box>
        </Button>
    )
};

export default CustomButton;

CustomButton.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.element,
    smallButton: PropTypes.bool,
};