import { memo } from "react";
// Utils & Config
import { useBuyFlow, useFilterDrawer } from "@stores";

// External components
import { Container, Grid, Chip, Icon } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import { FilterIcon } from "@atoms";

// Internal components
import { RecipesGrid } from "@organisms";
import { RoundedButton } from "@atoms";
import { TitleBuyFlow, RecipesBottomBar } from "@molecules";
import { useSnackbar } from "notistack";
import { chooseRecipes } from "helpers/serverRequests/order";
import { useLang } from "@hooks";

interface RecipeChoiseStepProps {
    recipes: any[];
}

export const RecipeChoiseStep = (props: RecipeChoiseStepProps) => {
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);
    const { recipes, firstOrderId, subscriptionId } = useBuyFlow(({ form }) => ({
        recipes: form.recipes,
        firstOrderId: form.firstOrderId,
        subscriptionId: form.subscriptionId,
    }));
    const gotToNextView = useBuyFlow(({ forward }) => forward);
    const { enqueueSnackbar } = useSnackbar();
    const [lang] = useLang('recipeChoiseStep');

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
            enqueueSnackbar(lang.changeSuccess, { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={1} style={{ marginBottom: 150 }}>
                <Grid item container justify="center">
                    <TitleBuyFlow
                        title={lang.title}
                        subtitle={lang.subtitle}
                    />
                </Grid>
                <Grid item container direction="column" spacing={2}>
                    <Grid item xs={3}>
                        <RoundedButton
                            variant="outline"
                            label={lang.filter}
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
                    <RecipesGrid recipesSelection={true} recipes={props.recipes} />
                </Grid>
            </Grid>
            <RecipesBottomBar handleSubmit={handleSubmit} />
        </Container>
    );
};

export default RecipeChoiseStep;
