import React from "react";

import SimpleRating from "../starRating/starRating";

import { CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Card, makeStyles } from "@material-ui/core";

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
    typography: {
        fontSize: theme.typography.fontSize,
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
    handleDeleteRecipe,
    recipeToRate,
}) {
    const classes = useStyles();
    const theme = useTheme();

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
                            {selectedRecipe.recipeName}
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
                    {isRated ? null : (
                        <Button size="small" className={classes.button} onClick={() => handleDeleteRecipe(recipeToRate)}>
                            NO VALORAR ESTA RECETA
                        </Button>
                    )}
                </CardActions>
            </Card>
        </>
    );
}
