import React, { memo, useMemo, useEffect, useState } from "react";
// Utils & Config
import { useBuyFlow, useFilterDrawer } from "@stores";
import _ from "lodash";
import * as ga from "../../../helpers/ga";

// External components
import { Container, Grid, Chip, Icon, useTheme } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import { FilterIcon } from "@atoms";

// Internal components
import { RecipesGrid } from "@organisms";
import { RoundedButton } from "@atoms";
import { TitleBuyFlow, RecipesBottomBar } from "@molecules";
import { useSnackbar } from "notistack";
import { chooseRecipes } from "helpers/serverRequests/order";
import { sendNewSubscriptionWelcomeEmail } from "helpers/serverRequests/subscription";
import { IFilter } from "@hooks";

interface RecipeChoiseStepProps {
    recipes: any[];
}

export const RecipeChoiseStep = (props: RecipeChoiseStepProps) => {
    const theme = useTheme();
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);
    const { planRecipes, recipes, firstOrderId, subscriptionId, firstOrderShippingDate, variant, selectRecipes } = useBuyFlow(
        ({ form, selectRecipes }) => ({
            planRecipes: form.planRecipes,
            recipes: form.recipes, // TO DO: Returns [] despite of being ok in previous steps
            selectRecipes: selectRecipes,
            firstOrderId: form.firstOrderId,
            subscriptionId: form.subscriptionId,
            firstOrderShippingDate: form.firstOrderShippingDate,
            variant: form.variant,
        })
    );
    const gotToNextView = useBuyFlow(({ forward }) => forward);
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleRemoveFilter = (filter: IFilter) => {
        ga.event({
            action: "clic en remover filtro",
            params: {
                event_category: "elegir recetas",
                event_label: filter.value.toLowerCase(),
            },
        });
        const newFilterState = filters.filter((f) => !filter.isEqualToFilterValue(f.value));
        setFilters(newFilterState);
    };

    const handleSubmit = async () => {
        ga.event({
            action: "clic en finalizar",
            params: {
                event_category: "elegir recetas",
                event_label: "finalizar",
            },
        });

        setIsLoading(true);

        var recipeSelection: { recipeId: string; quantity: number }[] = [];
        const ordererSelectedRecipes = _.orderBy(recipes, ["id"], ["asc"]);

        for (let recipe of ordererSelectedRecipes) {
            if (recipeSelection[0] && recipeSelection[0].recipeId === recipe.id) {
                recipeSelection[0] = { ...recipeSelection[0], quantity: recipeSelection[0].quantity + 1 };
            } else {
                recipeSelection = [{ recipeId: recipe.id, quantity: 1 }, ...recipeSelection];
            }
        }
        const res = await chooseRecipes(firstOrderId, recipeSelection);

        if (res.status === 200) {
            gotToNextView();
            sendWelcomeEmail();
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setIsLoading(false);
    };

    const handleChooseRecipesLater = () => {
        sendWelcomeEmail();
        ga.event({
            action: "clic en elegir recetas luego",
            params: {
                event_category: "elegir recetas",
                event_label: "elegir recetas luego",
            },
        });
        gotToNextView();
    };

    const filteredRecipes = useMemo(() => {
        return filters.length > 0
            ? planRecipes.filter((recipe) =>
                  filters.some((filter) => filter.isEqual(recipe.cookDurationNumberValue) || filter.isEqual(recipe.difficultyLevel))
              )
            : planRecipes;
    }, [filters]);

    const handleClickAddRecipe = (recipe) => {
        ga.event({
            action: "clic en agregar receta",
            params: {
                event_category: "elegir recetas",
                event_label: recipe.name.toLowerCase(),
            },
        });
        selectRecipes([...recipes, recipe]);
    };

    const handleClickRemoveRecipe = ({ id: _id }) => {
        ga.event({
            action: "clic en remover receta",
            params: {
                event_category: "elegir recetas",
                event_label: "remover receta",
            },
        });
        const index = recipes.findIndex(({ id }) => id === _id);
        if (index === -1) return;
        const newState = [...recipes];
        newState.splice(index, 1);
        selectRecipes(newState);
    };

    const sendWelcomeEmail = async () => {
        const res = await sendNewSubscriptionWelcomeEmail(subscriptionId);

        if (!!!res || res.status !== 200) {
            enqueueSnackbar("Error al enviar email de bienvenida", { variant: "error" });
        }
    };

    const handleClickOpenFilters = () => {
        ga.event({
            action: "clic en filtrar recetas",
            params: {
                event_category: "elegir recetas",
                event_label: "visualizar filtros",
            },
        });
        setDrawerOpen(!drawerIsOpen);
    };

    return (
        <Container maxWidth="lg" style={{ paddingTop: theme.spacing(8), paddingBottom: "200px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleBuyFlow
                        title="¡Muchas gracias por tu compra!"
                        subtitle={`Elige las ${variant.numberOfRecipes} recetas que recibirás el ${firstOrderShippingDate}`}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <RoundedButton
                                variant="outline"
                                label="Filtrar recetas"
                                style={{ backgroundColor: "white", padding: "8px" }}
                                onClick={handleClickOpenFilters}
                            >
                                <Icon fontSize="small" component={FilterIcon} />
                            </RoundedButton>
                        </Grid>
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
                        selectedRecipes={recipes}
                        maxRecipesQty={variant.numberOfRecipes}
                        recipesSelection={true}
                        recipes={filteredRecipes}
                    />
                </Grid>
            </Grid>
            <RecipesBottomBar
                handleSecondaryButtonClick={handleChooseRecipesLater}
                maxRecipesQty={variant.numberOfRecipes}
                selectedRecipes={recipes}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </Container>
    );
};

export default RecipeChoiseStep;
