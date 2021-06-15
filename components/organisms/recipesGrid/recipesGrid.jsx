// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import RecipeCard from "../../molecules/recipeCard/recipeCard";
import RecipeModal from "../../molecules/recipeModal/recipeModal";
import RecipeCardBuyFlow from "../../molecules/recipeCardBuyFlow/recipeCardBuyFlow";

const RecipesGrid = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpenModal = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const recipeDetail = {
        id: "3003d63c-68ee-4be4-82f6-20a5241afd6f",
        imageUrl: "https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg",
        imageTags: ["Mas vendida"],
        name: "Arepas de Crhistian",
        shortDescription: "Lorem ipsum dolor sit amet, conetur meand las ipscing elitr, sed diam nonumy eir tempor invidunt uorem ipsum dolor sit amet aswim",
        cookDuration: "50 min",
        difficultyLevel: "Alta",
        variantOptions: ['Opción sin gluten', 'Opción sin lactosa'],
        longDescription: "Lorem ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet aswim",
        // recipeVariants: [
        //     { name: 'Opción principal', ingredients: ["Pan", "Tomate", "Lechuga", "Queso", "Carne"] },
        //     { name: 'Opción sin glúten', ingredients: ["Tomate", "Lechuga",] },
        //     { name: 'Opción sin lactosa', ingredients: ["Pan", "Lechuga", "Carne"] }
        // ],
        recipeVariants: [
            ['Opción principal', 'Opción sin glúten', 'Opción sin lactosa'],
            ['Pan, Tomate, Lechuga, Queso, Carne', 'Tomate, Lechuga', 'Pan, Lechuga, Carne']
        ],
        tools: 'Bol, Tenedor, Cuchillo',
        nutritionalInformation: [
            { key: 'Valor energético', value: '114,8 kcal' },
            { key: 'Grasas', value: '2,2 g' },
            { key: '- de las cuales saturadas', value: '1,1 g' },
            { key: 'Hidratos de carbono', value: '18 g' },
            { key: '- de los cuales azúcares', value: '1,8 g' },
            { key: 'Proteínas', value: '4,4 g' },
            { key: 'Sal', value: '0,8 g' },
        ]
    }
    console.log(props.recipes)

    return (
        <>
            {props.recipesPage &&
                <Grid container direction="row" justify="left" alignItems="flex-start" spacing={2}>
                    {props.recipes.map((recipe, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <RecipeCard
                                img='https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg'
                                imgTags={["Más vendido"]}
                                timeTag={recipe.cookDuration}
                                difficultyTag={recipe.difficultyLevel}
                                recipeName={recipe.name}
                                handleClickOpenModal={handleClickOpenModal}
                            />
                        </Grid>
                    ))}
                </Grid>
            }

            {props.recipesSelection &&
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
                    {props.recipes.map((recipe, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <RecipeCardBuyFlow
                                img='https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg'
                                imgTags={["Más vendido"]}
                                timeTag={recipe.cookDuration}
                                difficultyTag={recipe.difficultyLevel}
                                recipeName={recipe.name}
                                handleClickOpenModal={handleClickOpenModal}
                            />
                        </Grid>
                    ))}
                </Grid>
            }

            <RecipeModal
                open={open}
                handleClose={handleClose}
                descriptionElementRef={descriptionElementRef}
                data={recipeDetail}
            />
        </>
    );
};

RecipesGrid.propTypes = {
    recipesPage: PropTypes.bool,
    recipesSelection: PropTypes.bool,
};

export default RecipesGrid;
