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
import { localeRoutes, Routes } from "lang/routes/routes";

const useStyles = makeStyles((theme) => ({}));

const RecipesNextWeekCard = (props) => {
    const lang = props.lang;
    const theme = useTheme();
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            {!props.hasChosenRecipesForNextWeek ? (
                <BoxWithTitle title={lang.title}>
                    <Box style={{ textAlign: "center", marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                        <Image src="/assets/userProfile/recipesEmptyState.svg" width="80" height="80" />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ fontSize: "16px", marginTop: theme.spacing(1), marginBottom: theme.spacing(2) }}
                        >
                            {props.canChooseRecipes
                                ? `${lang.hasNotChosenRecipesForNextWeek.withoutRecipesAndCanChooseText} ${props.nextWeekOrder.shippingDate}`
                                : lang.hasNotChosenRecipesForNextWeek.withoutRecipesAndCantChooseText}
                        </Typography>
                        {props.canChooseRecipes && (
                            <RoundedButton
                                label={lang.chooseRecipesBtnText}
                                onClick={() =>
                                    router.push(
                                        `${localeRoutes[router.locale][Routes["elegir-recetas"]]}?orderId=${props.nextWeekOrder.id}`
                                    )
                                }
                            />
                        )}
                    </Box>
                </BoxWithTitle>
            ) : (
                <BoxWithTitleAndTextButton
                    title={lang.title}
                    btnText={lang.editRecipesBtnText}
                    handleClick={() =>
                        router.push(`${localeRoutes[router.locale][Routes["elegir-recetas"]]}?orderId=${props.nextWeekOrder.id}`)
                    }
                    hideButton={!props.canChooseRecipes}
                >
                    <Typography variant="body2" color="textSecondary" style={{ fontSize: "16px" }}>
                        {lang.hasChosenRecipesForNextWeek.text} {props.nextWeekOrder.shippingDate}
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
