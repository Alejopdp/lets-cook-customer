// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

// Internal Components

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "100%",
        },
    },
}));

const CreatedByError = (props) => {
    const lang = props.lang;
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <Typography variant="body2" color="textPrimary" style={{ fontSize: "16px", marginBottom: theme.spacing(3) }}>
                {lang.modalText} <strong>{lang.emailText}</strong>
            </Typography>
            <div className={classes.root}>
                <TextField
                    id="created_by_error_comments"
                    label={lang.additionalComments}
                    multiline
                    rows={5}
                    variant="outlined"
                    value={props.value}
                    onChange={props.handleChange}
                    color="primary"
                />
            </div>
        </>
    );
};

export default CreatedByError;
