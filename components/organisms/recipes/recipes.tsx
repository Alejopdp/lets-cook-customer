import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import RecipesModal from "../../molecules/valueRecipesModal/recipesModal";
import FoodCard from "../../molecules/foodCard";
import { deleteRecipeRating, updateRecipeRating } from "../../../helpers/serverRequests/user-recipes";
import { useSnackbar } from "notistack";
import { RecipeRating } from "types/recipeRating";
import EmptyState from "components/molecules/emptyState/emptyState";

const baseRating = {
    comment: "",
    customer: "",
    id: "",
    isRated: false,
    lastShippingDate: "",
    qtyDelivered: 0,
    rating: 0,
    recipeId: "",
    recipeImageUrl: "",
    recipeName: "",
};

const Recipes = ({ ratings, lang, reload }) => {
    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme();
    // modal
    const [openRecipeModal, setOpenRecipeModal] = useState(false);
    const [recipesToRate, setRecipesToRate] = useState([]);
    const [recipesWithRating, setRecipesWithRating] = useState([]);
    const [chosenRecipe, setChosenRecipe] = useState<RecipeRating>(baseRating);
    const [starValue, setStarValue] = useState(0);
    const [oldValue, setOldValue] = useState(0);

    const handleRateRecipe = async (points: number, comment: string) => {
        const res = await updateRecipeRating(chosenRecipe.id, points, comment);

        if (res && res.status === 200) {
            enqueueSnackbar(lang.recipes.snackbars.success.ratedRecipe, { variant: "success" });
            setOpenRecipeModal(false);
            setChosenRecipe({...baseRating});
            reload();
        } else {
            enqueueSnackbar(res && res.data ? res.data.message : lang.recipes.snackbars.error.unexpectedError, { variant: "error" });
        }

    };

    const handleClickOpenRecipeModal = (selectedRating: RecipeRating, starValue: number) => {
        setChosenRecipe(selectedRating);
        if (selectedRating.rating) setOldValue(selectedRating.rating || 0);

        if (starValue) setStarValue(starValue);
        if (!!!starValue) {
            setStarValue(selectedRating.rating || 0);
        }
        setOpenRecipeModal(true);
    };

    const handleCloseRecipeModal = () => {
        setOpenRecipeModal(false);
        if (chosenRecipe.rating === undefined) setStarValue(0);
        if (chosenRecipe.rating) setStarValue(oldValue);
        setChosenRecipe(baseRating);
    };

    const handleDeleteRecipe = async (x) => {
        const res = await deleteRecipeRating(x.id);

        reload();
    };

    useEffect(() => {
        setRecipesToRate([]);
        setRecipesWithRating([]);
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                {ratings && ratings.length === 0 && <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                    <EmptyState text={lang.emptyState.text} title={lang.emptyState.title}/>
                </Grid>}
                {ratings.filter(rating => !rating.isRated).length > 0 && <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                    <Typography variant="h5">{lang.recipesRatingPendingSubtitle}</Typography>
                </Grid>}
                {ratings
                    .filter((rating) => !rating.isRated)
                    .map((recipeToRate) => {
                        return (
                            <Grid item xs={12} md={3} key={recipeToRate.id} onClick={() => setChosenRecipe(recipeToRate)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FoodCard
                                            selectedRecipe={recipeToRate}
                                            isRated={recipeToRate.isRated}
                                            height="339px"
                                            handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                            starValue={starValue}
                                            setStarValue={setStarValue}
                                            chosenRecipe={chosenRecipe}
                                            recipesToRate={recipesToRate}
                                            setRecipesToRate={setRecipesToRate}
                                            handleDeleteRecipe={handleDeleteRecipe}
                                            recipeToRate={recipeToRate}
                                            lang={lang.foodCard}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                {ratings && ratings.filter((rating) => rating.isRated).length > 0 && <Grid item xs={12} style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(1) }}>
                    <Typography variant="h5">{lang.recipesRatedSubtitle}</Typography>
                </Grid>}
                {ratings
                    .filter((rating) => rating.isRated)
                    .map((recipeWithRating) => {
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
                                            lang={lang.foodCard}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
            </Grid>
            <RecipesModal
                handlePrimaryButton={handleRateRecipe}
                open={openRecipeModal}
                handleClose={handleCloseRecipeModal}
                chosenRecipe={chosenRecipe}
                starValue={starValue}
                handleSecondaryButtonClick={handleCloseRecipeModal}
                setOpenRecipeModal={setOpenRecipeModal}
                recipesToRate={recipesToRate}
                setRecipesToRate={setRecipesToRate}
                recipesWithRating={recipesWithRating}
                setRecipesWithRating={setRecipesWithRating}
                setStarValue={setStarValue}
                setChosenRecipe={setChosenRecipe}
                lang={lang.recipesModal}
            />
        </>
    );
};

export default Recipes;
