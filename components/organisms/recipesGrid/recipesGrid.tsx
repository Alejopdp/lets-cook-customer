// Utils & config
import React from "react";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import { RecipeCard } from "@molecules";
import RecipeModal from "../../molecules/recipeModal/recipeModal";
import RecipeCardBuyFlow from "../../molecules/recipeCardBuyFlow/recipeCardBuyFlow";
import { RecipesGridProps } from "./interfaces";
import { useMemo } from "react";
import useAnalytics from "hooks/useAnalytics";

export const RecipesGrid = (props: RecipesGridProps) => {
    const { trackChooseRecipesClick } = useAnalytics();
    const [open, setOpen] = React.useState(false);
    const [recipeToView, setRecipeToView] = React.useState(null);

    const handleClickOpenModal = (recipe) => {
        trackChooseRecipesClick(recipe.name, props.recipesSelection ? "elegir recetas" : "recetas page");
        setRecipeToView(recipe);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleClickAddRecipe = (recipe) => {
    //     selectRecipes([...recipes, recipe]);
    // };

    // const handleClickRemoveRecipe = ({ id: _id }) => {
    //     const index = recipes.find(({ id }) => id !== _id);
    //     if (index === undefined) return;
    //     const newState = [...recipes];
    //     newState.splice(index, 1);
    //     selectRecipes(newState);
    // };

    const selectedRecipesQty = useMemo(() => {
        return props.recipesPage ? 0 : props.selectedRecipes.length;
    }, [props.selectedRecipes]);

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            {props.recipesPage && (
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
                    {props.recipes.map((recipe, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <RecipeCard
                                img={recipe.imageUrl}
                                imgTags={recipe.imageTags}
                                timeTag={recipe.cookDuration}
                                difficultyTag={recipe.difficultyLevel}
                                recipeName={recipe.name}
                                handleClickOpenModal={() => handleClickOpenModal(recipe)}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {props.recipesSelection && (
                <Grid container spacing={2}>
                    {props.recipes.map((recipe, index) => (
                        <Grid key={index} item xs={12} sm={6} md={3}>
                            <RecipeCardBuyFlow
                                id={recipe.id}
                                imageUrl={recipe.imageUrl}
                                imageTags={recipe.imageTags}
                                cookDuration={recipe.cookDuration}
                                difficultyLevel={recipe.difficultyLevel}
                                name={recipe.name}
                                selectedRecipes={props.selectedRecipes}
                                maxRecipesQty={props.maxRecipesQty}
                                handleClickOpenModal={() => handleClickOpenModal(recipe)}
                                handleClickAddRecipe={() => props.handleClickAddRecipe(recipe)}
                                handleClickRemoveRecipe={() => props.handleClickRemoveRecipe({ id: recipe.id as string })}
                                isAddable={selectedRecipesQty < props.maxRecipesQty}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {open && <RecipeModal open={open} handleClose={handleClose} recipe={recipeToView} />}
        </>
    );
};

export default RecipesGrid;
