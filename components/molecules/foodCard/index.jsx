import React from "react";

import SimpleRating from "../starRating/starRating";

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
        fontSize: theme.typography.fontSize,
    },
    span: {
        fontStyle: "italic",
    },
    button: {
        color: theme.palette.grey,
        fontFamily: theme.typography.fontFamily,
        fontWeight: "400",
        marginTop: "-1rem"
    },
}));

export default function FoodCard({ isRated, height, handleClickOpenRecipeModal }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style = {{height}}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://st2.depositphotos.com/1053417/11818/i/950/depositphotos_118180400-stock-photo-chinese-food-on-wok.jpg"
                    title="Comida"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" className={classes.typography}>
                        Salmon con Quinoa
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Entregado 1 vez <span className={classes.span}>(ultima entrega el 1 - 7 mayo)</span>
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <SimpleRating handleClickOpenRecipeModal = {handleClickOpenRecipeModal}/>
            </CardActions>
            <CardActions>
                {!isRated && (
                    <Button size="small" className={classes.button}>
                        NO VALORAR ESTA RECETA
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}
