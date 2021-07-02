import { memo } from "react";
// Utils & Config
import { useFilterDrawer } from "@stores";

// External components
import { Container, Grid, Chip, Icon } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import { FilterIcon } from "@atoms";

// Internal components
import { RecipesGrid } from "@organisms";
import { RoundedButton } from "@atoms";
import { TitleBuyFlow, RecipesBottomBar } from "@molecules";

interface RecipeChoiseStepProps {
    recipes: any[]
}

export const RecipeChoiseStep = (props: RecipeChoiseStepProps) => {

    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);

    const handleRemoveFilter = (filter) => {
        const newFilterState = filters.filter((f) => filter !== f);
        setFilters(newFilterState);
    };

    return (

        <Container maxWidth="lg">
            <Grid container spacing={1} style={{ marginBottom: 150 }}>
                <Grid item container justify="center">
                    <TitleBuyFlow
                        title="El pago ha sido exitoso. ¡Muchas gracias por tu compra!"
                        subtitle="Elige las 3 recetas que recibirás el martes 18"
                    />
                </Grid>
                <Grid item container direction="column" spacing={2}>
                    <Grid item xs={3}>
                        <RoundedButton
                            variant="outline"
                            label="Filtrar recetas"
                            style={{ backgroundColor: 'white' }}
                            onClick={() => {
                                setDrawerOpen(!drawerIsOpen);
                            }}
                        >
                            <Icon component={FilterIcon} />
                        </RoundedButton>
                    </Grid>
                    <Grid item container xs spacing={2}>
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
            <RecipesBottomBar />
        </Container>
    );
};

export default RecipeChoiseStep;
