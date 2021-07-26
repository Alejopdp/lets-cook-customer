import { memo } from "react";
import clsx from "clsx";
import { AppBar, Toolbar, Typography, Grid, Button, Box, useTheme, useMediaQuery } from "@material-ui/core";
import { CheckCircleOutline, ErrorOutlineOutlined } from "@material-ui/icons";
import { CustomButton, RoundedButton } from "@atoms";
import { useBuyFlow, useRecipesBottomBar } from "@stores";
import useStyles from "./styles";
import Hidden from '@material-ui/core/Hidden';

type RecipesBottomBarProps = {
    handleSubmit: () => void;
};

export const RecipesBottomBar = memo((props: RecipesBottomBarProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const { recipes, variant } = useBuyFlow((store) => ({ recipes: store.form.recipes, variant: store.form.variant }));
    const isOpen = useRecipesBottomBar(({ isOpen }) => isOpen);
    const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

    if (!isOpen) {
        return <></>;
    }

    return (
        <AppBar position="fixed" color="default" className={clsx(classes.appBar)}>
            <Toolbar className={classes.paddingBottom}>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} className={classes.generalContainer}>
                        <Box className={classes.boxContainer}>
                            <Hidden smDown>
                            {recipes.map((recipe, index) => (
                                <div key={index} className={clsx(classes.recipeSelectedRoot, classes.recipeSelected)} style={{ backgroundImage: `url(${recipe.imageUrl})`, }} />
                            ))}
                            {recipes.length < variant.numberOfRecipes &&
                                Array(variant.numberOfRecipes - recipes.length)
                                    .fill()
                                    .map((_, index) => (
                                        <div key={index} className={clsx(classes.recipeSelectedRoot, classes.recipeSelectedMock)} />
                                    ))}
                                </Hidden>
                            {recipes.length >= variant.numberOfRecipes && (
                                <div className={classes.recipesQtySelected}>
                                    <CheckCircleOutline color="primary" className={classes.marginRight} />
                                    <Typography variant='body2' color='textSecondary' style={{ fontSize: '14px' }}>¡Ha seleccionado todas las recetas!</Typography>
                                </div>
                            )}
                            {recipes.length < variant.numberOfRecipes && (
                                <div className={classes.recipesQtySelected}>
                                    <ErrorOutlineOutlined color="secondary" className={classes.marginRight} />
                                    <Typography variant='body2' color='textSecondary' style={{ fontSize: '14px' }}> Aún te quedan {variant.numberOfRecipes - recipes.length} recetas por seleccionar</Typography>
                                </div>
                            )}
                        </Box>
                        <Box style={{ display: 'flex', flexDirection: 'column' }}>
                            <RoundedButton
                                label="Finalizar"
                                onClick={props.handleSubmit}
                                disabled={variant.numberOfRecipes > recipes.length}
                                style={isXsDown && { width: '100%' }}
                            />
                            <Button variant="text" color="default" style={{ fontSize: '13px', marginTop: theme.spacing(0.5) }}>
                                Elegir recetas luego
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
});

export default RecipesBottomBar;
