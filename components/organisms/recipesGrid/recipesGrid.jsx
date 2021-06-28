// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import RecipeCard from "../../molecules/recipeCard/recipeCard";
import RecipeModal from "../../molecules/recipeModal/recipeModal";
import RecipeCardBuyFlow from "../../molecules/recipeCardBuyFlow/recipeCardBuyFlow";
import { useBuyFlow } from "../../../stores/buyFlow";

const RecipesGrid = (props) => {
    const [open, setOpen] = React.useState(false);
    const [recipeToView, setRecipeToView] = React.useState();
    const [recipes, selectRecipes] = useBuyFlow((store) => [store.form.recipes, store.selectRecipes]);

    const handleClickOpenModal = (recipe) => {
        setRecipeToView(recipe);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickAddRecipe = (recipe) => {
        selectRecipes([...recipes, recipe]);
    };

    const handleClickRemoveRecipe = ({ id: _id }) => {
        const index = recipes.find(({ id }) => id !== _id);
        if (index === -1) return;
        const newState = [...recipes]
        newState.splice(index,1)
        selectRecipes(newState);
    };

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
                <Grid container direction="row" justify="left" alignItems="flex-start" spacing={2}>
                    {props.recipes.map((recipe, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <RecipeCard
                                img={recipe.imageUrl}
                                imgTags={recipe.imageTags}
                                timeTag={recipe.cookDuration}
                                difficultyTag={recipe.difficultyLevel}
                                recipeName={recipe.name}
                                handleClickOpenModal={() => handleClickOpenModal(recipe)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {props.recipesSelection && (
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
                    {props.recipes.map((recipe, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <RecipeCardBuyFlow
                                id={recipe.id}
                                img={recipe.imageUrl}
                                imgTags={recipe.imageTags}
                                timeTag={recipe.cookDuration}
                                difficultyTag={recipe.difficultyLevel}
                                recipeName={recipe.name}
                                handleClickOpenModal={() => handleClickOpenModal(recipe)}
                                handleClickAddRecipe={() => handleClickAddRecipe(recipe)}
                                handleClickRemoveRecipe={() => handleClickRemoveRecipe(recipe)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {open && (
                <RecipeModal open={open} handleClose={handleClose} descriptionElementRef={descriptionElementRef} data={recipeToView} />
            )}
        </>
    );
};

RecipesGrid.propTypes = {
    recipesPage: PropTypes.bool,
    recipesSelection: PropTypes.bool,
};

export default RecipesGrid;
