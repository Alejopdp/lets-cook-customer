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

const useStyles = makeStyles((theme) => ({

}));

const RecipesActualWeekCard = props => {
    const lang = props.lang
    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <>
            {!props.hasChosenRecipesForActualWeek ? (
                <BoxWithTitle title={lang.title}>
                    <Box style={{ textAlign: 'center', marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                        <Image src='/assets/userProfile/recipesEmptyState.svg' width='80' height='80' />
                        <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginTop: theme.spacing(1), marginBottom: theme.spacing(0.5) }}>
                            {props.canChooseRecipes ? `${lang.hasNotChosenRecipesForActualWeek.withoutRecipesAndCanChooseText} ${props.actualWeekOrder.shippingDate}` : lang.hasNotChosenRecipesForActualWeek.withoutRecipesAndCantChooseText}
                        </Typography>
                        {props.canChooseRecipes && (
                            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                                {lang.hasNotChosenRecipesForActualWeek.withoutRecipesAndCantChooseSubtext}
                            </Typography>
                        )}
                    </Box>
                </BoxWithTitle>
            ) : (
                    <BoxWithTitle title={lang.title}>
                        <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                            {lang.hasChosenRecipesForActualWeek.text} {props.actualWeekOrder.shippingDate}
                        </Typography>
                        <ChosenRecipes recipes={props.actualWeekOrder.recipes} handleClickOpenRecipeModal={props.handleClickOpenRecipeModal} period='actualWeek' />
                    </BoxWithTitle>
                )}
        </>

    );
};

export default RecipesActualWeekCard;
