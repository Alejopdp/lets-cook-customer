import React from "react";

import SimpleRating from "../starRating/starRating";
import { deleteRecipe } from "../../../helpers/serverRequests/user-recipes";

import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "260px",
    },
    media: {
        height: "167px",
    },
    typography: {
        // fontSize: theme.typography.fontSize,
        fontSize: "10px",
    },
    span: {
        fontStyle: "italic",
    },
    button: {
        color: theme.palette.grey,
        fontFamily: theme.typography.fontFamily,
        fontWeight: "400",
        marginTop: "-1rem",
    },
}));

export default function FoodCard({
    isRated,
    height,
    handleClickOpenRecipeModal,
    selectedRecipe,
    starValue,
    setStarValue,
    chosenRecipe,
    recipesToRate,
    setRecipesToRate,
}) {
    const classes = useStyles();

    const handleDeleteRecipe = async () => {
        const res = await deleteRecipe(chosenRecipe.id);
        recipesToRate.map((recipeToRate) => {
            if (recipeToRate.id === chosenRecipe.id) {
                console.log("dentro del if");
            }
        });
    };

    return (
        <>
            <Card className={classes.root} style={{ height }}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://st2.depositphotos.com/1053417/11818/i/950/depositphotos_118180400-stock-photo-chinese-food-on-wok.jpg"
                        title={selectedRecipe.recipeName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" className={classes.typography}>
                            {selectedRecipe.id}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {selectedRecipe.label}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <SimpleRating
                        selectedRecipe={selectedRecipe}
                        isRated={isRated}
                        handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                        starValue={starValue}
                        setStarValue={setStarValue}
                    />
                </CardActions>
                <CardActions>
                    {!isRated && (
                        <Button size="small" className={classes.button} onClick={() => handleDeleteRecipe()}>
                            NO VALORAR ESTA RECETA
                        </Button>
                    )}
                </CardActions>
            </Card>
        </>
    );
}
