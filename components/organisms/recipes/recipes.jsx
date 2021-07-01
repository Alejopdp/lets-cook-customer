import React, { useState } from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid, useTheme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RecipesModal from "../../molecules/valueRecipesModal/recipesModal";
import FoodCard from "../../molecules/foodCard";

const useStyles = makeStyles((theme) => ({
    typography: {
        fontWeight: "500",
        fontFamily: theme.typography.fontFamily,
        marginBottom: ".5rem",
    },
    valueRecipes: {
        fontWeight: "500",
        fontFamily: theme.typography.fontFamily,
        marginBottom: ".5rem",
        marginTop: "1rem",
    },
}));

const Recipes = ({ id }) => {
    const classes = useStyles();

    const [openRecipeModal, setOpenRecipeModal] = useState(false);

    const handleClickOpenRecipeModal = () => {
        setOpenRecipeModal(true);
    };

    const handleCloseRecipeModal = () => {
        setOpenRecipeModal(false);
    };

    return (
        <>
            <Grid container style={{ marginBottom: "1rem" }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.typography}>
                                Recetas pendientes de valorar
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {[...Array(5)].map((x) => {
                    return (
                        <>
                            <Grid item xs={12} md={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FoodCard height="339px" handleClickOpenRecipeModal={handleClickOpenRecipeModal} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    );
                })}
            </Grid>
            <Grid container style={{ marginBottom: "1rem" }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.valueRecipes}>
                                Recetas valoradas
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {[...Array(5)].map((x) => {
                    return (
                        <>
                            <Grid item xs={12} md={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FoodCard isRated={true} height="310px" handleClickOpenRecipeModal={handleClickOpenRecipeModal} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    );
                })}
            </Grid>

            <RecipesModal
                open={openRecipeModal}
                handleClose={handleCloseRecipeModal}
                primaryButtonText="CALIFICAR RECETA"
                secondaryButtonText="CANCELAR"
            />
        </>
    );
};

export default Recipes;
