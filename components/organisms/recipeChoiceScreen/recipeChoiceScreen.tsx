import React, { useState } from "react";
import PropTypes from "prop-types";
import { RecipeChoiceScreenProps } from "./interfaces";

// External components
import { Chip, Container, Grid, Icon } from "@material-ui/core";

// Internal components
import { RecipesBottomBar } from "@molecules";
import { RecipesGrid } from "../recipesGrid";
import { FilterIcon, RoundedButton } from "@atoms";

// Images & icons
import { HighlightOff } from "@material-ui/icons";
import TitleBuyFlow from "components/molecules/titleBuyFlow/titleBuyFlow";
import { useFilterDrawer } from "@stores";
import { useSnackbar } from "notistack";
import { chooseRecipes } from "helpers/serverRequests/order";
import { useRouter } from "next/router";

const RecipeChoiceScreen = (props: RecipeChoiceScreenProps) => {
    const router = useRouter();
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedRecipes, setselectedRecipes] = useState([]);

    const handleRemoveFilter = (filter) => {
        const newFilterState = filters.filter((f) => filter !== f);
        setFilters(newFilterState);
    };

    const handleSubmit = async () => {
        var recipeSelection: { recipeId: string; quantity: number }[] = [];

        for (let recipe of props.recipes) {
            if (recipeSelection[0] && recipeSelection[0].recipeId === recipe.id) {
                recipeSelection[0] = { ...recipeSelection[0], quantity: recipeSelection[0].quantity + 1 };
            } else {
                recipeSelection = [{ recipeId: recipe.id, quantity: 1 }, ...recipeSelection];
            }
        }
        const res = await chooseRecipes(router.query.orderId as string, recipeSelection);

        if (res.status === 200) {
            enqueueSnackbar("Changed correctly", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleClickAddRecipe = (recipe) => {
        setselectedRecipes([...selectedRecipes, recipe]);
    };

    const handleClickRemoveRecipe = ({ id: _id }) => {
        const index = selectedRecipes.find(({ id }) => id !== _id);
        if (index === -1) return;
        const newState = [...selectedRecipes];
        newState.splice(index, 1);
        setselectedRecipes(newState);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={1} style={{ marginBottom: 150 }}>
                <Grid item container justify="center">
                    <TitleBuyFlow
                        title={`Elige las ${props.maxRecipesQty} recetas que recibirás el ${props.nextDeliveryLabel}`}
                        // title={`Elige las X recetas que recibirás el DDDD`}
                        subtitle=""
                    />
                </Grid>
                <Grid item container direction="column" spacing={2}>
                    <Grid item xs={3}>
                        <RoundedButton
                            variant="outline"
                            label="Filtrar recetas"
                            style={{ backgroundColor: "white" }}
                            onClick={() => {
                                setDrawerOpen(!drawerIsOpen);
                            }}
                        >
                            <Icon component={FilterIcon} />
                        </RoundedButton>
                    </Grid>
                    <Grid item container spacing={2}>
                        {filters.map((filter, index) => (
                            <Grid key={index} item>
                                <Chip
                                    key={index}
                                    label={filter}
                                    onDelete={() => handleRemoveFilter(filter)}
                                    color="secondary"
                                    style={{ color: "white" }}
                                    deleteIcon={<HighlightOff style={{ color: "white" }} />}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item>
                    <RecipesGrid
                        handleClickAddRecipe={handleClickAddRecipe}
                        handleClickRemoveRecipe={handleClickRemoveRecipe}
                        recipesSelection={true}
                        recipes={props.recipes}
                        selectedRecipes={selectedRecipes}
                        maxRecipesQty={props.maxRecipesQty}
                    />
                </Grid>
            </Grid>
            <RecipesBottomBar selectedRecipes={selectedRecipes} maxRecipesQty={props.maxRecipesQty} handleSubmit={handleSubmit} />
        </Container>
    );
};

RecipeChoiceScreen.propTypes = {};

export default RecipeChoiceScreen;
