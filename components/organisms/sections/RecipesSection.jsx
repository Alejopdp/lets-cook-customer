import { GridList, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import RoundedButton from '../../atoms/roundedButton/roundedButton';
import RecipeCard from '../../molecules/recipeCard/recipeCard';
import TitleOtherPages from '../../molecules/titleOtherPages/titleOtherPages';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    rootCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    title: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6)
    },
    smallText: {
        paddingTop: theme.spacing(1),
    },
    carrusel: {
        height: 300,
        maxWidth: "100vw",
        overflow: "hidden",
        overflowX: "scroll",
        justifyContent: "flex-start",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}));

const RecipesSection = () => {
    const classes = useStyles();
    const recipes = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <TitleOtherPages
                    title="Hecha un vistazo a las recetas de esta semana"
                    subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
                    align="flex-start"
                />
            </div>
            <div className={classes.carrusel}>
                {recipes.map((recipe, key) => (
                    <div key={key} style={{
                        padding: 8,
                        width: 500,
                    }}>
                        <RecipeCard
                            img='https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg'
                            imgTags={["Más vendido", "Vegano"]}
                            timeTag={"15 min"}
                            difficultyTag={"Fácil"}
                            recipeName={"Salmón con quinoa"}
                        />
                    </div>
                ))
                }
            </div>
            <div className={classes.rootCenter}>
                <RoundedButton label="Ver planes" />
                <Typography
                    className={classes.smallText}
                    variant="caption">
                    Podrás pausar, cambiar o cancelar el plan cuando quieras
                </Typography>
            </div>
        </div>
    );
}
RecipesSection.propTypes = {

};

export default RecipesSection;
