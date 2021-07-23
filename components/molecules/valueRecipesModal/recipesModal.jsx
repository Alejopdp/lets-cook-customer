// Utils & Config
import React, { useState, useEffect } from "react";

import { useTheme, makeStyles, Typography, Grid, TextField, Button, DialogActions, useMediaQuery, Box } from "@material-ui/core";

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
    span: {
        fontStyle: "italic",
    },
    boxRecipeDesc: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        marginLeft: theme.spacing(3),
    },
}));

const RecipesModal = (props) => {
    const theme = useTheme();
    const classes = useStyles();
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

    const [comment, setComment] = useState("");

    useEffect(() => {
        if (chosenRecipe.comment === "") setComment("");
    }, [chosenRecipe.id]);

    useEffect(() => {
        if (chosenRecipe.recipeName) setChosenRecipe({ ...chosenRecipe, comment });
    }, [comment]);

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };

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
                if (chosenRecipe.comment !== "") {
                    let obj = { ...recipe, rating: parseInt(rating), comment: chosenRecipe.comment };
                    setRecipesWithRating(recipesWithRating.concat(obj));
                } else {
                    let obj = { ...recipe, rating: parseInt(rating), comment };
                    setRecipesWithRating(recipesWithRating.concat(obj));
                }
            }
        });
    };

    return (
        <Modal
            open={props.open}
            handleClose={handleSecondaryButtonClick}
            handlePrimaryButtonClick={() => handleQualificationClick(chosenRecipe.id, starValue, comment)}
            title={chosenRecipe.rating ? "Modificar calificacion" : "Calificar receta"}
            primaryButtonText={chosenRecipe.rating ? "Modificar calificacion" : "Calificar receta"}
            secondaryButtonText="cancelar"
            fullScreen={true}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ display: "flex" }}>
                    <img
                        src="https://st2.depositphotos.com/1053417/11818/i/950/depositphotos_118180400-stock-photo-chinese-food-on-wok.jpg"
                        className={classes.img}
                    />
                    <Box className={classes.boxRecipeDesc}>
                        <Typography gutterBottom variant="h6">
                            {chosenRecipe.recipeName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {chosenRecipe.label}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <SimpleRating setStarValue={setStarValue} starValue={starValue} selectedRecipe={chosenRecipe} isModal={true} />
                </Grid>
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
            {/* <DialogActions>
                <Button onClick={() => handleSecondaryButtonClick()} style={{ color: theme.palette.text.secondary }}>
                    CANCELAR
                </Button>
                <Button
                    onClick={() => handleQualificationClick(chosenRecipe.id, starValue, comment)}
                    style={{ color: theme.palette.primary.main }}
                >
                    {chosenRecipe.rating ? "Modificar calificacion" : "Calificar receta"}
                </Button>
            </DialogActions> */}
        </Modal>
    );
};

export default RecipesModal;
