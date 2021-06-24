// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';

// Internal components


const useStyles = makeStyles((theme) => ({
    recipeImage: {
        borderRadius: '8px',
    }
}));

const ChosenRecipes = props => {
    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <>
            {props.recipes.map((recipe, index) => (
                <Box key={index} style={{ display: 'flex', justifyContent: 'space-between', marginTop: theme.spacing(3) }}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <Image className={classes.recipeImage} src={recipe.imageUrl} alt={recipe.name} width={87} height={56} />
                        <Typography variant='body2' color='textSecondary' style={{ fontSize: '18px', fontWeight: 500, marginLeft: theme.spacing(2) }}>
                            {recipe.name}
                        </Typography>
                    </Box>
                    <IconButton aria-label="edit" onClick={() => props.handleClickOpenRecipeModal(recipe.id, props.period)}>
                        <VisibilityIcon fontSize='large' />
                    </IconButton>
                </Box>
            ))}
        </>
    );
};

export default ChosenRecipes;
