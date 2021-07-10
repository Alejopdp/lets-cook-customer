import React from "react";

import SimpleRating from "../starRating/starRating";
import { deleteRecipe } from "../../../helpers/serverRequests/user-recipes";

import { makeStyles, useTheme } from "@material-ui/core";
import { CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: "8px",
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
    },
    media: {
        height: "167px",
    },
    span: {
        fontStyle: "italic",
    },
    button: {
        color: theme.palette.grey,
        fontFamily: theme.typography.fontFamily,
        fontWeight: "400",
        marginTop: theme.spacing(1),
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
    const theme = useTheme();

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
                <CardMedia
                    className={classes.media}
                    image="https://st2.depositphotos.com/1053417/11818/i/950/depositphotos_118180400-stock-photo-chinese-food-on-wok.jpg"
                    title={selectedRecipe.recipeName}
                />
                <CardContent style={{padding: theme.spacing(2)}}>
                    <Typography variant="caption">
                        {selectedRecipe.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(2) }}>
                        {selectedRecipe.label}
                    </Typography>
                    <SimpleRating
                        selectedRecipe={selectedRecipe}
                        isRated={isRated}
                        handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                        starValue={starValue}
                        setStarValue={setStarValue}
                    />
                    {!isRated && (
                        <Button size="small" className={classes.button} onClick={() => handleDeleteRecipe()}>
                            NO VALORAR ESTA RECETA
                        </Button>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
