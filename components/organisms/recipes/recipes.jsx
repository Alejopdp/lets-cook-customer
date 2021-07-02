import React, { useState, useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RecipesModal from "../../molecules/valueRecipesModal/recipesModal";
import FoodCard from "../../molecules/foodCard";

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

    // modal
    const [openRecipeModal, setOpenRecipeModal] = useState(false);

    // recipes from axios
    const [recipesToRate, setRecipesToRate] = useState([]);
    const [recipesWithRating, setRecipesWithRating] = useState([]);

    // onClick
    const [chosenRecipe, setChosenRecipe] = useState({});

    const handleClickOpenRecipeModal = () => {
        setOpenRecipeModal(true);
    };

    const handleCloseRecipeModal = () => {
        setChosenRecipe({});
        setOpenRecipeModal(false);
    };

    useEffect(() => {
        setRecipesToRate(recipes.recipesToRate);
        setRecipesWithRating(recipes.recipesWithRating);
    }, []);

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
                        <>
                            <Grid item xs={12} md={3} onClick={() => setChosenRecipe(recipeToRate)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FoodCard
                                            selectedRecipe={recipeToRate}
                                            isRated={false}
                                            height="339px"
                                            handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
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
                        <>
                            <Grid item xs={12} md={3} onClick={() => setChosenRecipe(recipeWithRating)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FoodCard
                                            selectedRecipe={recipeWithRating}
                                            isRated={true}
                                            height="310px"
                                            handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    );
                })}
            </Grid>

            <RecipesModal
                open={openRecipeModal}
                handleClose={handleCloseRecipeModal}
                secondaryButtonText="CANCELAR"
                chosenRecipe={chosenRecipe}
            />
            {/* <RecipesWithRatingModal
                open={openRecipesWithRatingModal}
                handleClose={handleClickCloseRecipesWithRatingModal}
                primaryButtonText="MODIFICAR CALIFICACION"
                secondaryButtonText="CANCELAR"
            /> */}
        </>
    );
};

export default Recipes;
