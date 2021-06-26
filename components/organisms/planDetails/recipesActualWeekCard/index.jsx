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
    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <>
            {props.recipesActualWeek.length === 0 ? (
                <BoxWithTitle title='Recetas de la semana actual'>
                    <Box style={{ textAlign: 'center', marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                        <Image src='/assets/userProfile/recipesEmptyState.svg' width='80' height='80' />
                        <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginTop: theme.spacing(1), marginBottom: theme.spacing(0.5) }}>
                            {props.abilityToChooseRecipes ? 'No has seleccionado recetas para la entrega del martes 12 de junio' : 'Estamos eligiendo por tí las recetas de la semana actual'}
                        </Typography>
                        {props.abilityToChooseRecipes && (
                            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                                Elegiremos por tí las recetas de esta semana
                            </Typography>
                        )}
                    </Box>
                </BoxWithTitle>
            ) : (
                    <BoxWithTitle title='Recetas de la semana actual'>
                        <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                            Estas son las recetas que recibirás el martes 12 de junio
                        </Typography>
                        <ChosenRecipes recipes={props.recipesActualWeek} handleClickOpenRecipeModal={props.handleClickOpenRecipeModal} period='actualWeek' />
                    </BoxWithTitle>
                )}
        </>

    );
};

export default RecipesActualWeekCard;
