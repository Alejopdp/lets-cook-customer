// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Image from "next/image";

// Internal components
import BoxWithTitle from "../../../molecules/specificBox/boxWithTitle";
import ChosenRecipes from "../chosenRecipes/index";
import { useLang } from "@hooks";

const useStyles = makeStyles((theme) => ({}));

const RecipesActualWeekCard = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const [lang] = useLang("recipesActualWeekCard");

    return (
        <>
            {!props.hasChosenRecipesForActualWeek ? (
                <BoxWithTitle title={lang.title}>
                    <Box style={{ textAlign: "center", marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                        <Image src="/assets/userProfile/recipesEmptyState.svg" width="80" height="80" />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ fontSize: "16px", marginTop: theme.spacing(1), marginBottom: theme.spacing(0.5) }}
                        >
                            {props.canChooseRecipes ? `${lang.empty} ${props.actualWeekOrder.shippingDate}` : lang.selectingByYou}
                        </Typography>
                        {props.canChooseRecipes && (
                            <Typography variant="body2" color="textSecondary" style={{ fontSize: "16px" }}>
                                {lang.choiseByYou}
                            </Typography>
                        )}
                    </Box>
                </BoxWithTitle>
            ) : (
                <BoxWithTitle title={lang.recipesWeek}>
                    <Typography variant="body2" color="textSecondary" style={{ fontSize: "16px" }}>
                        {lang.delyveryOn + " " + props.actualWeekOrder.shippingDate}
                    </Typography>
                    <ChosenRecipes
                        recipes={props.actualWeekOrder.recipes}
                        handleClickOpenRecipeModal={props.handleClickOpenRecipeModal}
                        period="actualWeek"
                    />
                </BoxWithTitle>
            )}
        </>
    );
};

export default RecipesActualWeekCard;
