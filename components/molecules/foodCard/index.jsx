import React from "react";
import SimpleRating from "../starRating/starRating";
import { CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Card, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: "8px",
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        paddingBottom: 16,
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
    lang,
}) {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root} style={{ height }}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={selectedRecipe.recipeImageUrl}
                        title={selectedRecipe.recipeName}
                        onClick={(e) => handleClickOpenRecipeModal(selectedRecipe, 0)}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" className={classes.typography}>
                            {selectedRecipe.recipeName}
                        </Typography>
                        {selectedRecipe.qtyDelivered > 0 && (
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`${selectedRecipe.qtyDelivered} ${selectedRecipe.qtyDelivered ? lang.oneTimeDeliveredText : lang.deliveredText} `}  ({lang.lastShippmentText}{" "}
                                {selectedRecipe.lastShippingDate})
                            </Typography>
                        )}
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <SimpleRating
                        selectedRecipe={selectedRecipe}
                        isRated={isRated}
                        handleClickOpenRecipeModal={(rating) => handleClickOpenRecipeModal(selectedRecipe, rating)}
                        starValue={starValue}
                        setStarValue={setStarValue}
                    />
                </CardActions>
                <CardActions style={{}}>
                    {isRated ? null : (
                        <Button size="small" className={classes.button} onClick={() => handleDeleteRecipe(recipeToRate)}>
                            {lang.dontRateBtnLabel}
                        </Button>
                    )}
                </CardActions>
            </Card>
        </>
    );
}
