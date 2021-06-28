import React, { useState } from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import StarRatingRecipeCard from "../../molecules/card/starRatingRecipeCard";
import RecipesModal from "../../molecules/valueRecipesModal/recipesModal";

const classes = {
    // desktop
    first: "container",
    second: "blog screen-1",

    iconArrow: "iconArrow",
    valueRecipes: "x24-1 proximanova-24px",
    pendingToValue: "text13 proximanova-20px",

    group1018: "group1018",
    group1005: "group1005",
    group1009: "group1009",
    group10091: "group1009-1",
    group1531: "group1531",
    group1976: "group1976",
    group1977: "group1977",
    group1978: "group1978",
    group1979: "group1979",

    recipeTitle: "recipeTitle proximanova-16px",
    p: "p opensans-14px",
    delivered: "opensans-14px-2",
    date: "opensans-14px-3",
    overlapGroup: "overlapGroup",
    icon: "starIcon",
    icon1: "starIcon-1",
    notValue: "text1 proximanova-13px",
    ratedRecipes: "recetasValoradas proximanova-20px",
    recetasSinValorar: "recetasSinValorar",
    pendingToValue3: "pendingToValue3",

    // mobile
    mobile: "mobile screen-1",
    pendingToValue2: "text14 proximanova-20px",

    group5: "group5",
    group2015: "group2015",
    group2016: "group2016",

    flexRow: "flexRow",
    flexRow1: "flexRow1",
};

const Recipes = ({ id }) => {
    const matches = useMediaQuery("(min-width:961px)");

    const [openRecipeModal, setOpenRecipeModal] = useState(false);

    const handleClickOpenRecipeModal = () => {
        setOpenRecipeModal(true);
    };

    const handleCloseRecipeModal = () => {
        setOpenRecipeModal(false);
    };

    return (
        <>
            <div className={matches ? classes.second : classes.mobile}>
                <div className={classes.group5}>
                    <ArrowBackIcon />
                    <h1 className={classes.valueRecipes}>Valorar recetas</h1>
                </div>

                <div className={matches ? classes.pendingToValue : classes.pendingToValue2}>Recetas pendientes de valorar</div>

                <div className={matches ? classes.group1976 : classes.flexRow}>
                    {[...Array(5)].map((x, i) => {
                        return <StarRatingRecipeCard rated = {false} handleClickOpenRecipeModal={handleClickOpenRecipeModal} />;
                    })}
                </div>

                <div className={matches ? classes.pendingToValue : classes.pendingToValue2}>Recetas valoradas</div>

                <div className={matches ? classes.group1976 : classes.flexRow}>
                    {[...Array(5)].map((x, i) => {
                        return <StarRatingRecipeCard rated = {true} handleClickOpenRecipeModal={handleClickOpenRecipeModal} />;
                    })}
                </div>
            </div>

            <RecipesModal open={openRecipeModal} handleClose={handleCloseRecipeModal} />
        </>
    );
};

export default Recipes;
