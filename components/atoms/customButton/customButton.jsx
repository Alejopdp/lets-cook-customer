// Utils & Config
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    button: {
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.paper,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(4),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

const CustomButton = ({ text, onClick }) => {
    const { button } = useStyles();

    return (
        <Button className={button} onClick={onClick}>
            {text}
        </Button>
    )
};

export default CustomButton;

CustomButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};