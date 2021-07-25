import { memo } from "react";
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

interface RecipeChoiseStepProps {
    recipes: any[];
}

export const RecipeChoiseStep = (props: RecipeChoiseStepProps) => {
    const theme = useTheme();
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);
    const { recipes, firstOrderId, subscriptionId } = useBuyFlow(({ form }) => ({
        recipes: form.recipes,
        firstOrderId: form.firstOrderId,
        subscriptionId: form.subscriptionId,
    }));
    const gotToNextView = useBuyFlow(({ forward }) => forward);
    const { enqueueSnackbar } = useSnackbar();

    const handleRemoveFilter = (filter) => {
        const newFilterState = filters.filter((f) => filter !== f);
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
        const res = await chooseRecipes(firstOrderId, recipeSelection, subscriptionId);

        if (res.status === 200) {
            gotToNextView();
            enqueueSnackbar("Changed correctly", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleBuyFlow
                        title="El pago ha sido exitoso. ¡Muchas gracias por tu compra!"
                        subtitle="Elige las 3 recetas que recibirás el martes 18"
                    />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: theme.spacing(2) }}>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item>
                            <RoundedButton
                                variant="outline"
                                label="Filtrar recetas"
                                style={{ backgroundColor: "white", padding:'8px'}}
                                onClick={() => {
                                    setDrawerOpen(!drawerIsOpen);
                                }}
                            >
                                <Icon fontSize='small' component={FilterIcon} />
                            </RoundedButton>
                        </Grid>
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
                <Grid item xs={12}>
                    <RecipesGrid recipesSelection={true} recipes={props.recipes} />
                </Grid>
            </Grid>
            <RecipesBottomBar handleSubmit={handleSubmit} />
        </Container>
    );
};

export default RecipeChoiseStep;
