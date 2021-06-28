// Utils & Config
import PropTypes from "prop-types";
import { useBuyFlow, useFilterDrawer } from "../../../stores/buyFlow";

// External components
import { Container, Grid, Chip, Icon } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import FilterIcon from "../../atoms/filterIcon";

// Internal components
import RecipesGrid from "../../organisms/recipesGrid/recipesGrid";
import CustomButton from "../../atoms/roundedButton/roundedButton";
import TitleBuyFlow from "../../molecules/titleBuyFlow/titleBuyFlow";
import { RecipesBottomBar } from "../../molecules/recipeBottomBar";

export const RecipeChoiseStep = (props) => {
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
                        <CustomButton
                            variant="outline"
                            label="Filtrar recetas"
                            style={{ backgroundColor: 'white'}}
                            onClick={() => {
                                setDrawerOpen(!drawerIsOpen);
                            }}
                        >
                            <Icon component={FilterIcon} />
                        </CustomButton>
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

RecipeChoiseStep.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            // TODO: Recipe structure
        })
    ),
};

RecipeChoiseStep.defaultProps = {
    recipes: [],
};

export default RecipeChoiseStep;
