import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { RecipeChoiceScreenProps } from "./interfaces";
import { useLang } from "@hooks";

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
import { IFilter } from "@layouts";

interface IFilterOptions {
    title: string;
    items: IFilter[];
}

const RecipeChoiceScreen = (props: RecipeChoiceScreenProps) => {
    const router = useRouter();
    const theme = useTheme();
    const [lang] = useLang("buyFlowLayout");
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedRecipes, setselectedRecipes] = useState([]);

    const _filterOptions: IFilterOptions[] = [
        {
            title: lang.difficultLevel,
            items: [
                {
                    label: lang.itemEasy,
                    value: lang.itemEasy,
                    isEqual: (recipeDifficultLevel) => recipeDifficultLevel === lang.itemEasy,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.itemEasy,
                },
                {
                    label: lang.itemMedium,
                    value: lang.itemMedium,
                    isEqual: (recipeDifficultLevel) => recipeDifficultLevel === lang.itemMedium,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.itemMedium,
                },
                {
                    label: lang.itemHard,
                    value: lang.itemHard,
                    isEqual: (recipeDifficultLevel) => recipeDifficultLevel === lang.itemHard,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.itemHard,
                },
            ],
        },
        {
            title: lang.timeOfCook,
            items: [
                {
                    label: lang.item15Min,
                    value: lang.item15Min,
                    isEqual: (recipeCookTime: number) => recipeCookTime < 15,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.item15Min,
                },
                {
                    label: lang.item15To30,
                    value: lang.item15To30,
                    isEqual: (recipeCookTime: number) => 15 <= recipeCookTime && recipeCookTime < 30,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.item15To30,
                },
                {
                    label: lang.item30To60,
                    value: lang.item30To60,
                    isEqual: (recipeCookTime: number) => 30 <= recipeCookTime && recipeCookTime < 60,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.item30To60,
                },
                {
                    label: lang.itemUpperTo60,
                    value: lang.itemUpperTo60,
                    isEqual: (recipeCookTime: number) => recipeCookTime >= 60,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.itemUpperTo60,
                },
            ],
        },
    ];

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

        for (let recipe of props.recipes) {
            if (recipeSelection[0] && recipeSelection[0].recipeId === recipe.id) {
                recipeSelection[0] = { ...recipeSelection[0], quantity: recipeSelection[0].quantity + 1 };
            } else {
                recipeSelection = [{ recipeId: recipe.id, quantity: 1 }, ...recipeSelection];
            }
        }
        const res = await chooseRecipes(router.query.orderId as string, recipeSelection);

        if (res.status === 200) {
            enqueueSnackbar("Recetas elegidas correctamente", { variant: "success" });
            router.replace({ pathname: `/detalle-del-plan/${props.subscriptionId}` });
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

    const filteredRecipes = useMemo(() => {
        return filters.length > 0
            ? props.recipes.filter((recipe) =>
                  filters.some((filter) => filter.isEqual(recipe.cookDurationNumberValue) || filter.isEqual(recipe.difficultyLevel))
              )
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
            <RecipesBottomBar selectedRecipes={selectedRecipes} maxRecipesQty={props.maxRecipesQty} handleSubmit={handleSubmit} />
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
