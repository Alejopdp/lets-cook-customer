import React, { useState, useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import RecipesModal from "../../molecules/valueRecipesModal/recipesModal";
import FoodCard from "../../molecules/foodCard";

const useStyles = makeStyles((theme) => ({

}));

const Recipes = ({ recipes }) => {
    const classes = useStyles();
    const theme = useTheme();
    // modal
    const [openRecipeModal, setOpenRecipeModal] = useState(false);

    // recipes from axios
    const [recipesToRate, setRecipesToRate] = useState([]);
    const [recipesWithRating, setRecipesWithRating] = useState([]);

    // onClick
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

    useEffect(() => {
        setRecipesToRate(recipes.recipesToRate);
        setRecipesWithRating(recipes.recipesWithRating);
    }, [recipes]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                    <Typography variant="h6">
                        Recetas pendientes de valorar
                    </Typography>
                </Grid>
                {recipesToRate.map((recipeToRate) => {
                    return (
                        <Grid item xs={12} sm={6} md={3} key={recipeToRate.id} onClick={() => setChosenRecipe(recipeToRate)}>
                            <FoodCard
                                selectedRecipe={recipeToRate}
                                isRated={false}
                                handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                starValue={starValue}
                                setStarValue={setStarValue}
                                chosenRecipe={chosenRecipe}
                                recipesToRate={recipesToRate}
                                setRecipesToRate={setRecipesToRate}

                            />
                        </Grid>
                    );
                })}
                <Grid item xs={12} style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(1) }}>
                    <Typography variant="h6">
                        Recetas valoradas
                    </Typography>
                </Grid>
                {recipesWithRating.map((recipeWithRating) => {
                    return (
                        <Grid item xs={12} sm={6} md={3} key={recipeWithRating.id} onClick={() => setChosenRecipe(recipeWithRating)}>
                            <FoodCard
                                selectedRecipe={recipeWithRating}
                                isRated={true}
                                handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                starValue={starValue}
                                setStarValue={setStarValue}
                                chosenRecipe={chosenRecipe}
                                recipesToRate={recipesToRate}
                                setRecipesToRate={setRecipesToRate}

                            />
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
