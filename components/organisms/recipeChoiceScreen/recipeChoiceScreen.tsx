import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { RecipeChoiceScreenProps } from "./interfaces";
import { useLang, useRecipesFilters } from "@hooks";
import _ from "lodash";

// External components
import { Chip, Container, Grid, Icon, useTheme } from "@material-ui/core";

// Internal components
import { DrawerMenu, RecipesBottomBar } from "@molecules";
import { RecipesGrid } from "../recipesGrid";
import { FilterIcon, RoundedButton } from "@atoms";

// Images & icons
import { HighlightOff } from "@material-ui/icons";
import TitleBuyFlow from "components/molecules/titleBuyFlow/titleBuyFlow";
import { useFilterDrawer } from "@stores";
import { useSnackbar } from "notistack";
import { chooseRecipes } from "helpers/serverRequests/order";
import { useRouter } from "next/router";
import { Recipe } from "@helpers";
import { localeRoutes, Routes } from "lang/routes/routes";

const RecipeChoiceScreen = (props: RecipeChoiceScreenProps) => {
    const router = useRouter();
    const theme = useTheme();
    const [lang] = useLang("buyFlowLayout");
    const [_filterOptions] = useRecipesFilters();
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedRecipes, setselectedRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (props.actualChosenRecipes.length > 0) {
            const recipesToAdd = [];
            for (let selection of props.actualChosenRecipes) {
                const recipe: Recipe | undefined = props.recipes.find((recipe) => recipe.id === selection.recipeId);

                for (let i = 0; i < selection.quantity; i++) {
                    if (!!!recipe) break;

                    recipesToAdd.push(recipe);
                }
            }

            setselectedRecipes([...recipesToAdd]);
        }
    }, []);

    const handleRemoveFilter = (filter) => {
        const newFilterState = filters.filter((f) => filter !== f);
        setFilters(newFilterState);
    };

    const _handleClickApplyFilters = (_filters) => {
        setFilters(_filters);
        setDrawerOpen(!drawerIsOpen);
    };

    const handleSubmit = async () => {
        var recipeSelection: { recipeId: string; quantity: number }[] = [];
        const ordererSelectedRecipes = _.orderBy(selectedRecipes, ["id"], ["asc"]);

        for (let recipe of ordererSelectedRecipes) {
            if (recipeSelection[0] && recipeSelection[0].recipeId === recipe.id) {
                recipeSelection[0] = { ...recipeSelection[0], quantity: recipeSelection[0].quantity + 1 };
            } else {
                recipeSelection = [{ recipeId: recipe.id, quantity: 1 }, ...recipeSelection];
            }
        }
        const res = await chooseRecipes(router.query.orderId as string, recipeSelection);

        if (res.status === 200) {
            enqueueSnackbar("Recetas elegidas correctamente", { variant: "success" });
            router.replace({
                pathname: `${localeRoutes[router.locale][Routes["detalle-del-plan"]]}?subscriptionId=${props.subscriptionId}`,
            });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleClickAddRecipe = (recipe: Recipe) => {
        setselectedRecipes([...selectedRecipes, recipe]);
    };

    const handleClickRemoveRecipe = (recipe: Recipe) => {
        const index = selectedRecipes.findIndex((selectedRecipe) => selectedRecipe.id === recipe.id);

        if (index === -1) return;

        const newState = [...selectedRecipes];
        newState.splice(index, 1);
        setselectedRecipes(newState);
    };

    const filteredRecipes = useMemo(() => {
        return filters.length > 0
            ? props.recipes.filter((recipe) => {
                  return filters.some((filter) => filter.isEqual(recipe.cookDurationNumberValue) || filter.isEqual(recipe.difficultyLevel));
              })
            : props.recipes;
    }, [filters]);

    return (
        <Container maxWidth="lg" style={{ paddingTop: theme.spacing(6), paddingBottom: "200px" }}>
            <Grid container spacing={2}>
                <Grid item container justify="center">
                    <TitleBuyFlow
                        title={`Elige las ${props.maxRecipesQty} recetas que recibirás el ${props.nextDeliveryLabel}`}
                        subtitle=""
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <RoundedButton
                                variant="outline"
                                label="Filtrar recetas"
                                style={{ backgroundColor: "white", padding: "8px" }}
                                onClick={() => {
                                    setDrawerOpen(!drawerIsOpen);
                                }}
                            >
                                <Icon component={FilterIcon} />
                            </RoundedButton>
                        </Grid>
                        {/* <Grid item xs={9} container spacing={2}> */}
                        {filters.map((filter, index) => (
                            <Grid key={index} item>
                                <Chip
                                    key={index}
                                    label={filter.label}
                                    onDelete={() => handleRemoveFilter(filter)}
                                    color="secondary"
                                    style={{ color: "white" }}
                                    deleteIcon={<HighlightOff style={{ color: "white" }} />}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <RecipesGrid
                        handleClickAddRecipe={handleClickAddRecipe}
                        handleClickRemoveRecipe={handleClickRemoveRecipe}
                        recipesSelection={true}
                        recipes={filteredRecipes}
                        selectedRecipes={selectedRecipes}
                        maxRecipesQty={props.maxRecipesQty}
                    />
                </Grid>
            </Grid>
            <RecipesBottomBar
                selectedRecipes={selectedRecipes}
                maxRecipesQty={props.maxRecipesQty}
                handleSubmit={handleSubmit}
                handleSecondaryButtonClick={() => router.back()}
                lang={lang}
            />
            {drawerIsOpen && (
                <DrawerMenu
                    open={drawerIsOpen}
                    items={_filterOptions}
                    selectedItems={filters}
                    handleOnClose={() => setDrawerOpen(false)}
                    handleOnClickApplyButton={_handleClickApplyFilters}
                />
            )}
        </Container>
    );
};

RecipeChoiceScreen.propTypes = {};

export default RecipeChoiceScreen;
