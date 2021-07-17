import { memo } from "react";
import clsx from "clsx";
import { AppBar, Toolbar, Typography, Grid, Button, Box } from "@material-ui/core";
import { CheckCircleOutline, ErrorOutlineOutlined } from "@material-ui/icons";
import { CustomButton } from "@atoms";
import { useBuyFlow, useRecipesBottomBar } from "@stores";
import useStyles from "./styles";

type RecipesBottomBarProps = {
    handleSubmit: () => void;
};

export const RecipesBottomBar = memo((props: RecipesBottomBarProps) => {
    const classes = useStyles();
    const { recipes, variant } = useBuyFlow((store) => ({ recipes: store.form.recipes, variant: store.form.variant }));
    const isOpen = useRecipesBottomBar(({ isOpen }) => isOpen);

    if (!isOpen) {
        return <></>;
    }

    return (
        <AppBar position="fixed" color="default" className={clsx(classes.appBar)}>
            <Toolbar className={classes.paddingBottom}>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs container justify="space-around">
                        {recipes.map((recipe, index) => (
                            <Grid key={index} item>
                                <div
                                    className={clsx(classes.recipeSelectedRoot, classes.recipeSelected)}
                                    style={{
                                        backgroundImage: `url(${recipe.imageUrl})`,
                                    }}
                                />
                            </Grid>
                        ))}
                        {recipes.length < variant.numberOfRecipes &&
                            Array(variant.numberOfRecipes - recipes.length)
                                .fill()
                                .map((_, key) => (
                                    <Box key={key} display="flex" flexWrap="wrap">
                                        <div className={clsx(classes.recipeSelectedRoot, classes.recipeSelectedMock)} />
                                    </Box>
                                ))}
                    </Grid>

                    <Grid item xs={6}>
                        {recipes.length >= variant.numberOfRecipes && (
                            <Grid container>
                                <CheckCircleOutline color="primary" className={classes.marginRight} />
                                <Typography>¡Ha seleccionado todas las recetas!</Typography>
                            </Grid>
                        )}
                        {recipes.length < variant.numberOfRecipes && (
                            <Grid container>
                                <ErrorOutlineOutlined color="secondary" className={classes.marginRight} />
                                <Typography> Aún te quedan {variant.numberOfRecipes - recipes.length} recetas por seleccionar</Typography>
                            </Grid>
                        )}
                    </Grid>

                    <Grid item xs container direction="column" alignItems="center">
                        <Grid item>
                            <CustomButton
                                text="Finalizar"
                                style={{ minWidth: 212 }}
                                onClick={props.handleSubmit}
                                disabled={variant.numberOfRecipes > recipes.length}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="text" color="default">
                                Elegir recetas luego
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
});

export default RecipesBottomBar;
