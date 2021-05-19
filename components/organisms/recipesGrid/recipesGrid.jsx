// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import ReceiptCard from "../../molecules/receiptCard/receiptCard";

const RecipesGrid = (props) => {
    return (
        <Grid container direction="row" justify="left" alignItems="flex-start" spacing={2}>
            {props.recipes.map((recipe, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <ReceiptCard
                        img='https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg'
                        imgTags={["Más vendido", "Vegano"]}
                        timeTag={recipe.cookDuration}
                        difficultyTag={recipe.difficultyLevel}
                        recipeName={recipe.name}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

RecipesGrid.propTypes = {};

export default RecipesGrid;
