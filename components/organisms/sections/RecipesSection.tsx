import { GridList, makeStyles, Typography, Container, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import RoundedButton from '../../atoms/roundedButton/roundedButton';
import RecipeCard from '../../molecules/recipeCard/recipeCard';
import TitleOtherPages from '../../molecules/titleOtherPages/titleOtherPages';

import { Recipe } from '@helpers';
import { useRecipesStyles as useStyles } from "./styles";
import { RecipesSectionProps } from "./interfaces";
import { memo } from 'react';

// const _recipes = Array<Recipe>(4).fill({
//     imageUrl: 'https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg',
//     imageTags: ["Más vendido", "Vegano"],
//     cookDuration: "15 min",
//     difficultyLevel: "Fácil",
//     name: "Salmón con quinoa"
// }).map<Recipe>((recipe, index) => ({
//     ...recipe,
//     name: `(${index}) ${recipe.name}`,
//     id: `${index}`
// }));

export const RecipesSection = memo((props: RecipesSectionProps) => {
    const classes = useStyles();

    const handleClickOpenModal = (recipe: Recipe) => {
        console.log('***-> Recipe: ', recipe.name);
    }

    return (
        // <div className={classes.root}>
        //     <div className={classes.title}>
        //         <TitleOtherPages
        //             title="Hecha un vistazo a las recetas de esta semana"
        //             subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
        //             align="flex-start"
        //         />
        //     </div>
        //     <div className={classes.carrusel}>
        //         {recipes.map((recipe, key) => (
        //             <div key={key} style={{
        //                 padding: 8,
        //                 width: 500,
        //             }}>
        //                 <RecipeCard
        //                     img='https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg'
        //                     imgTags={["Más vendido", "Vegano"]}
        //                     timeTag={"15 min"}
        //                     difficultyTag={"Fácil"}
        //                     recipeName={"Salmón con quinoa"}
        //                 />
        //             </div>
        //         ))}
        //     </div>
        //     <div className={classes.rootCenter}>
        //         <RoundedButton label="Ver planes" />
        //         <Typography
        //             className={classes.smallText}
        //             variant="caption">
        //             Podrás pausar, cambiar o cancelar el plan cuando quieras
        //         </Typography>
        //     </div>
        // </div>


        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <TitleOtherPages
                    title={props.title}
                    subtitle={props.subtitle}
                    align={props.titleAlign}
                />
                {(props.recipes || []).map((recipe, key) => (
                    <Grid key={key} item xs={12} sm={6} md={3} >
                        <RecipeCard
                            img={recipe.imageUrl}
                            imgTags={recipe.imageTags}
                            timeTag={recipe.cookDuration}
                            difficultyTag={recipe.difficultyLevel}
                            recipeName={recipe.name}
                            handleClickOpenModal={() => { handleClickOpenModal(recipe) }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
});

export default RecipesSection;
