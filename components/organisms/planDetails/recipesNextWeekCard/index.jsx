// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Image from "next/image";

// Internal components
import BoxWithTitleAndTextButton from "../../../molecules/specificBox/boxWithTitleAndTextButton";
import BoxWithTitle from "../../../molecules/specificBox/boxWithTitle";
import ChosenRecipes from "../chosenRecipes/index";
import RoundedButton from "../../../atoms/roundedButton/roundedButton";
import { useLang } from "@hooks";

const useStyles = makeStyles((theme) => ({}));

const RecipesNextWeekCard = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const router = useRouter();
    const [lang] = useLang("recipesActualWeekCard");

    return (
        <>
            {!props.hasChosenRecipesForNextWeek ? (
                <BoxWithTitle title={lang.nextWeek}>
                    <Box style={{ textAlign: "center", marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                        <Image src="/assets/userProfile/recipesEmptyState.svg" width="80" height="80" />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ fontSize: "16px", marginTop: theme.spacing(1), marginBottom: theme.spacing(2) }}
                        >
                            {lang.choiseYouRecipes + " " + props.nextWeekOrder.shippingDate}
                        </Typography>
                        <RoundedButton label={lang.choiseRecipe} onClick={() => router.push(`/elegir-recetas/${props.nextWeekOrder.id}`)} />
                    </Box>
                </BoxWithTitle>
            ) : (
                <BoxWithTitleAndTextButton title={lang.nextWeek} btnText="modificar recetas">
                    <Typography variant="body2" color="textSecondary" style={{ fontSize: "16px" }}>
                        {lang.deliveryOn + " " + props.nextWeekOrder.shippingDate}
                    </Typography>
                    <ChosenRecipes
                        recipes={props.nextWeekOrder.recipes}
                        handleClickOpenRecipeModal={props.handleClickOpenRecipeModal}
                        period="nextWeek"
                    />
                </BoxWithTitleAndTextButton>
            )}
        </>
    );
};

export default RecipesNextWeekCard;
