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

const HadProblemsWithLetscook = (props) => {
    const lang = props.lang;
    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <Typography variant="body2" color="textPimary" style={{ fontSize: "16px", marginBottom: theme.spacing(3) }}>
                {lang.modalText}
            </Typography>
            <div className={classes.root}>
                <TextField
                    id="had_problems_with_letscook_comments"
                    label={lang.inputLabel}
                    multiline
                    rows={5}
                    variant="outlined"
                    value={props.value}
                    onChange={props.handleChange}
                />
            </div>
        </>
    );
};

export default HadProblemsWithLetscook;
