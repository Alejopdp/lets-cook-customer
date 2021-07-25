import { memo } from "react";
import clsx from "clsx";
import { AppBar, Toolbar, Typography, Grid, Button, Box, useTheme } from "@material-ui/core";
import { CheckCircleOutline, ErrorOutlineOutlined } from "@material-ui/icons";
import { CustomButton, RoundedButton } from "@atoms";
import { useBuyFlow, useRecipesBottomBar } from "@stores";
import useStyles from "./styles";

type RecipesBottomBarProps = {
    handleSubmit: () => void;
};

export const RecipesBottomBar = memo((props: RecipesBottomBarProps) => {
    const classes = useStyles();
    const theme = useTheme();
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
                                <Typography variant='body2' color='textSecondary' style={{ fontSize: '14px' }}>¡Ha seleccionado todas las recetas!</Typography>
                            </Grid>
                        )}
                        {recipes.length < variant.numberOfRecipes && (
                            <Grid container>
                                <ErrorOutlineOutlined color="secondary" className={classes.marginRight} />
                                <Typography variant='body2' color='textSecondary' style={{ fontSize: '14px' }}> Aún te quedan {variant.numberOfRecipes - recipes.length} recetas por seleccionar</Typography>
                            </Grid>
                        )}
                    </Grid>

                    <Grid item xs container direction="column" alignItems="center">
                        <Grid item>
                            <RoundedButton
                                label="Finalizar"
                                onClick={props.handleSubmit}
                                disabled={variant.numberOfRecipes > recipes.length}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="text" color="default" style={{ fontSize: '13px', marginTop: theme.spacing(0.5) }}>
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
