// Utils & Config
import React from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles, Typography, Grid, TextField } from "@material-ui/core";

// External Components
import Modal from "../../atoms/modal/modal";
import SimpleRating from "../starRating/starRating";

const useStyles = makeStyles((theme) => ({
    img: {
        height: "96px",
        width: "150px",
        borderRadius: "5%",
    },
    typography: {
        fontSize: theme.typography.fontSize,
    },
    span: {
        fontStyle: "italic",
    },
    gridItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "-.7rem",
    },
}));

const RecipesWithRatingModal = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    const styleRatingStar = {
        display: "flex",
        justifyContent: "center",
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            fullScreen={fullScreen}
        >
            <Grid container style={{ marginBottom: "1rem" }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Modificar calificacion</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img
                                src="https://st2.depositphotos.com/1053417/11818/i/950/depositphotos_118180400-stock-photo-chinese-food-on-wok.jpg"
                                className={classes.img}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} md={8} className={classes.gridItem}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h6" component="h2" className={classes.typography}>
                                Salmon con Quinoa
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Entregado 1 vez <span className={classes.span}>(ultima entrega el 1 - 7 mayo)</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container style={{ marginBottom: "1rem" }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SimpleRating isModal={true} fullScreen={fullScreen} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container style={{ marginBottom: "1rem" }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <form className={classes.root} noValidate autoComplete="off" style={{ marginTop: "1rem" }}>
                                <TextField
                                    id="outlined-basic"
                                    placeholder="Ingrese aqui sus comentarios sobre la receta (opcional)"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows="5"
                                />
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default RecipesWithRatingModal;
