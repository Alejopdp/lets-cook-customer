import React from "react";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "@material-ui/core";
import { useTheme, makeStyles } from '@material-ui/core/styles'
import TextField from "@material-ui/core/TextField";

// Internal Components
import Modal from "../../atoms/modal/modal";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "67ch",
            [theme.breakpoints.down("sm")]: {
                width: "40ch",
            },
        },
        marginLeft: "-0.6rem",
        marginTop: "-1rem",
    },
}));

const PasswordModal = (props) => {
    const isMdUp = useMediaQuery("(min-width:960px)");
    const theme = useTheme();
    const classes = useStyles();
    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            fullScreen={isMdUp ? false : true}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
        >
            <Grid container>
                <Grid item xs={12}>
                    <Grid container alignItems="center" style={{ cursor: "pointer", marginBottom: theme.spacing(3) }}>
                        <Typography variant="h6" style={{ fontSize: isMdUp ? "22px" : "20px" }}>
                            Modificar contraseña
                        </Typography>
                    </Grid>
                </Grid>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Nueva contraseña" variant="outlined" />
                    <TextField id="outlined-basic" label="Repita su nueva contraseña" variant="outlined" />
                </form>
            </Grid>
        </Modal>
    );
};

export default PasswordModal;
