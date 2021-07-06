import React, { useState, useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RecipesModal from "../../molecules/valueRecipesModal/recipesModal";
import FoodCard from "../../molecules/foodCard";
import { deleteRecipe } from "../../../helpers/serverRequests/user-recipes";

const useStyles = makeStyles((theme) => ({
    typography: {
        fontWeight: "500",
        fontFamily: theme.typography.fontFamily,
        marginBottom: ".5rem",
    },
    valueRecipes: {
        fontWeight: "500",
        fontFamily: theme.typography.fontFamily,
        marginBottom: ".5rem",
        marginTop: "1rem",
    },
}));

const Recipes = ({ recipes }) => {
    const classes = useStyles();

    const [openRecipeModal, setOpenRecipeModal] = useState(false);

    const [recipesToRate, setRecipesToRate] = useState([]);
    const [recipesWithRating, setRecipesWithRating] = useState([]);

    const [chosenRecipe, setChosenRecipe] = useState({});

    const [starValue, setStarValue] = useState(0);

    const [oldValue, setOldValue] = useState(0);

    const handleClickOpenRecipeModal = (starValue) => {
        if (chosenRecipe.rating) setOldValue(chosenRecipe.rating);

        if (starValue) setStarValue(starValue);
        setOpenRecipeModal(true);
    };

    const handleCloseRecipeModal = () => {
        if (chosenRecipe.rating === undefined) setStarValue(0);
        if (chosenRecipe.rating) setStarValue(oldValue);
        setOpenRecipeModal(false);
    };

    const handleSecondaryButtonClick = () => {
        if (chosenRecipe.rating === undefined) setStarValue(0);
        if (chosenRecipe.rating) setStarValue(oldValue);
        setOpenRecipeModal(false);
    };

    const handleDeleteRecipe = async (x) => {
        const res = await deleteRecipe(x.id);
        const filteredArray = recipesToRate.filter((recipe) => recipe.id !== x.id);
        setRecipesToRate(filteredArray);
    };

    useEffect(() => {
        setRecipesToRate(recipes.recipesToRate);
        setRecipesWithRating(recipes.recipesWithRating);
    }, [recipes]);

    return (
        <>
            <Grid container style={{ marginBottom: "1rem" }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.typography}>
                                Recetas pendientes de valorar
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {recipesToRate.map((recipeToRate) => {
                    return (
                        <Grid item xs={12} md={3} key={recipeToRate.id} onClick={() => setChosenRecipe(recipeToRate)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FoodCard
                                        selectedRecipe={recipeToRate}
                                        isRated={false}
                                        height="339px"
                                        handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                        starValue={starValue}
                                        setStarValue={setStarValue}
                                        chosenRecipe={chosenRecipe}
                                        recipesToRate={recipesToRate}
                                        setRecipesToRate={setRecipesToRate}
                                        handleDeleteRecipe={handleDeleteRecipe}
                                        recipeToRate={recipeToRate}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid container style={{ marginBottom: "1rem" }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.valueRecipes}>
                                Recetas valoradas
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {recipesWithRating.map((recipeWithRating) => {
                    return (
                        <Grid item xs={12} md={3} key={recipeWithRating.id} onClick={() => setChosenRecipe(recipeWithRating)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FoodCard
                                        selectedRecipe={recipeWithRating}
                                        isRated={true}
                                        height="310px"
                                        handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                        starValue={starValue}
                                        setStarValue={setStarValue}
                                        chosenRecipe={chosenRecipe}
                                        recipesToRate={recipesToRate}
                                        setRecipesToRate={setRecipesToRate}
                                        handleDeleteRecipe={handleDeleteRecipe}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>

            <RecipesModal
                open={openRecipeModal}
                handleClose={handleCloseRecipeModal}
                chosenRecipe={chosenRecipe}
                starValue={starValue}
                handleSecondaryButtonClick={handleSecondaryButtonClick}
                setOpenRecipeModal={setOpenRecipeModal}
                recipesToRate={recipesToRate}
                setRecipesToRate={setRecipesToRate}
                recipesWithRating={recipesWithRating}
                setRecipesWithRating={setRecipesWithRating}
                setStarValue={setStarValue}
                setChosenRecipe={setChosenRecipe}
            />
        </>
    );
};

export default Recipes;
