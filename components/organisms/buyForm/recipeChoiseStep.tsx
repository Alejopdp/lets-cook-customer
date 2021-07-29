import { memo, useMemo } from "react";
// Utils & Config
import { useBuyFlow, useFilterDrawer } from "@stores";

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
import { IFilter } from "@layouts";

interface RecipeChoiseStepProps {
    recipes: any[];
}

export const RecipeChoiseStep = (props: RecipeChoiseStepProps) => {
    const theme = useTheme();
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);
    const { recipes, firstOrderId, subscriptionId, firstOrderShippingDate, variant } = useBuyFlow(({ form }) => ({
        recipes: form.recipes,
        firstOrderId: form.firstOrderId,
        subscriptionId: form.subscriptionId,
        firstOrderShippingDate: form.firstOrderShippingDate,
        variant: form.variant,
    }));
    const gotToNextView = useBuyFlow(({ forward }) => forward);
    const { enqueueSnackbar } = useSnackbar();

    const handleRemoveFilter = (filter: IFilter) => {
        const newFilterState = filters.filter((f) => !filter.isEqualToFilterValue(f.value));
        setFilters(newFilterState);
    };

    const handleSubmit = async () => {
        var recipeSelection: { recipeId: string; quantity: number }[] = [];

        for (let recipe of recipes) {
            if (recipeSelection[0] && recipeSelection[0].recipeId === recipe.id) {
                recipeSelection[0] = { ...recipeSelection[0], quantity: recipeSelection[0].quantity + 1 };
            } else {
                recipeSelection = [{ recipeId: recipe.id, quantity: 1 }, ...recipeSelection];
            }
        }
        const res = await chooseRecipes(firstOrderId, recipeSelection);

        if (res.status === 200) {
            gotToNextView();
            enqueueSnackbar("Changed correctly", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
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
                <Grid item xs={12}>
                    <TitleBuyFlow
                        title="El pago ha sido exitoso. ¡Muchas gracias por tu compra!"
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
                                onClick={() => {
                                    setDrawerOpen(!drawerIsOpen);
                                }}
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
                    <RecipesGrid recipesSelection={true} recipes={filteredRecipes} />
                </Grid>
            </Grid>
            <RecipesBottomBar handleSubmit={handleSubmit} />
        </Container>
    );
};

export default RecipeChoiseStep;
