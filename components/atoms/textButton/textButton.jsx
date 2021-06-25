// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// import clsx from "clsx";

// External components
import Button from "@material-ui/core/Button";



const useStyles = makeStyles((theme) => ({
    textButton: {
        padding: '0px',
        fontSize: '14px',
        '&:hover': {
            // backgroundColor: theme.palette.background.paper,
            backgroundColor: 'transparent',

        }
    }
}));

const TextButton = (props) => {
    const classes = useStyles();

    return (
        <Button size="small" className={classes.textButton} style={props.style} onClick={props.handleClick}>
            {props.btnText}
        </Button>
    );
};

TextButton.propTypes = {
    btnText: PropTypes.string.isRequired,
};

export default TextButton;