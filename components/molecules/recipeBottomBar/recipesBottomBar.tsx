import { memo } from "react";
import clsx from "clsx";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import {CheckCircleOutline, ErrorOutlineOutlined} from '@material-ui/icons';
import { CustomButton } from "@atoms";
import { useBuyFlow, useRecipesBottomBar } from "@stores";
import useStyles from "./styles";

export const RecipesBottomBar = memo(() => {
    const classes = useStyles();
    const recipes = useBuyFlow((store) => store.form.recipes);
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
                        {recipes.length < 3 &&
                            Array(3 - recipes.length)
                                .fill()
                                .map((_, key) => (
                                    <Grid key={key} item>
                                        <div className={clsx(classes.recipeSelectedRoot, classes.recipeSelectedMock)} />
                                    </Grid>
                                ))}
                    </Grid>

                    <Grid item xs={6}>
                        {recipes.length >= 3 && (
                            <Grid container>
                                <CheckCircleOutline color="primary" className={classes.marginRight} />
                                <Typography>¡Ha seleccionado todas las recetas!</Typography>
                            </Grid>
                        )}
                        {recipes.length < 3 && (
                            <Grid container>
                                <ErrorOutlineOutlined color="secondary" className={classes.marginRight} />
                                <Typography> Aún te quedan {3 - recipes.length} recetas por seleccionar</Typography>
                            </Grid>
                        )}
                    </Grid>

                    <Grid item xs container direction="column" alignItems="center">
                        <Grid item>
                            <CustomButton text="Finalizar" onClick={() => {}} />
                        </Grid>
                        <Grid item>
                            <Typography className={classes.textCenter}> Elegir recetas luego</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
});


export default RecipesBottomBar;