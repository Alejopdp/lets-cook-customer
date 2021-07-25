import { GridList, makeStyles, Typography, Container, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import RoundedButton from '../../atoms/roundedButton/roundedButton';
import RecipeCard from '../../molecules/recipeCard/recipeCard';
import TitleOtherPages from '../../molecules/titleOtherPages/titleOtherPages';

import { Recipe } from '@helpers';
import { useRecipesStyles as useStyles } from "./styles";
import { RecipesSectionProps } from "./interfaces";
import { memo } from 'react';

export const RecipesSection = memo((props: RecipesSectionProps) => {
    const classes = useStyles();

    const handleClickOpenModal = (recipe: Recipe) => {
        console.log('***-> Recipe: ', recipe.name);
    }

    return (
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