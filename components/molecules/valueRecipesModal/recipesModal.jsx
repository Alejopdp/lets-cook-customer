// Utils & Config
import React, { useState, useEffect } from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles, Typography, Grid, TextField, Button, DialogActions } from "@material-ui/core";

// External Components
import Modal from "../../atoms/modal/modal";
import SimpleRating from "../starRating/starRating";
import { updateRecipeRating } from "../../../helpers/serverRequests/user-recipes";

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

const RecipesModal = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    const [comment, setComment] = useState("");

    const {
        chosenRecipe,
        starValue,
        handleSecondaryButtonClick,
        setOpenRecipeModal,
        recipesToRate,
        setRecipesToRate,
        recipesWithRating,
        setRecipesWithRating,
        setStarValue,
        setChosenRecipe,
    } = props;

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };

    useEffect(() => {
        setChosenRecipe({ ...chosenRecipe, comment });
    }, [comment]);

    const handleQualificationClick = async (recipeId, rating, comment) => {
        setOpenRecipeModal(false);
        const res = await updateRecipeRating(recipeId, rating, comment);
        recipesToRate.map((recipeToRate, i) => {
            if (recipeToRate.id === chosenRecipe.id) {
                const recipe = recipesToRate.splice(i, 1).shift();
                let obj = { ...recipe, rating: parseInt(rating), comment };
                setRecipesToRate(recipesToRate);
                setRecipesWithRating(recipesWithRating.concat(obj));
            }
        });
        recipesWithRating.map((recipeWithRating, i) => {
            if (recipeWithRating.id === chosenRecipe.id) {
                const recipe = recipesWithRating.splice(i, 1).shift();
                let obj = { ...recipe, rating: parseInt(rating), comment };
                setRecipesWithRating(recipesWithRating.concat(obj));
            }
        });
    };

    return (
        <Modal open={props.open} handleClose={props.handleClose} fullScreen={fullScreen}>
            <Grid container style={{ marginBottom: "1rem" }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">{chosenRecipe.rating ? "Modificar calificacion" : "Calificar receta"}</Typography>
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
                                {chosenRecipe.recipeName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {chosenRecipe.label}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container style={{ marginBottom: "1rem" }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SimpleRating
                                setStarValue={setStarValue}
                                starValue={starValue}
                                selectedRecipe={chosenRecipe}
                                isModal={true}
                                fullScreen={fullScreen}
                            />
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
                                    id={chosenRecipe.id}
                                    placeholder="Ingrese aqui sus comentarios sobre la receta (opcional)"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows="5"
                                    onChange={(e) => handleChangeComment(e)}
                                    value={chosenRecipe.comment}
                                />
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <DialogActions>
                <Button onClick={() => handleSecondaryButtonClick()} style={{ color: theme.palette.text.secondary }}>
                    CANCELAR
                </Button>
                <Button
                    onClick={() => handleQualificationClick(chosenRecipe.id, starValue, comment)}
                    style={{ color: theme.palette.primary.main }}
                >
                    {chosenRecipe.rating ? "Modificar calificacion" : "Calificar receta"}
                </Button>
            </DialogActions>
        </Modal>
    );
};

export default RecipesModal;
