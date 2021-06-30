import React, { useState } from "react";

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
            width: "30ch",
            [theme.breakpoints.down("sm")]: {
                width: "35ch",
            },
        },
        marginLeft: "-0.6rem",
    },
    phoneInput: {
        marginTop: ".6rem",
        height: "3.2rem",
    },
}));

const PersonalDataModal = (props) => {
    const isMdUp = useMediaQuery("(min-width:960px)");
    const theme = useTheme();
    const classes = useStyles();

    const [value, setValue] = useState();

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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" style={{ fontSize: isMdUp ? "22px" : "20px" }}>
                                Modificar datos personales
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <form noValidate autoComplete="off">
                                <TextField className={classes.root} id="outlined-basic" label="Nombre" variant="outlined" />
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <form noValidate autoComplete="off">
                                <TextField className={classes.root} id="outlined-basic" label="Apellido" variant="outlined" />
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1>Phone input</h1>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1>Phone input</h1>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <p>Hola</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <form noValidate autoComplete="off">
                                <TextField className={classes.root} id="outlined-basic" label="Idioma de Preferencia" variant="outlined" />
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default PersonalDataModal;
