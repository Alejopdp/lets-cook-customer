// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import ReceiptCard from "../../molecules/receiptCard/receiptCard";

const RecipesGrid = (props) => {
    return (
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
            {props.recipes.map((recipe, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <ReceiptCard
                        mainTag={"Más vendido"}
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
