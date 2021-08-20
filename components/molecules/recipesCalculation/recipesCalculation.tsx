// Utils & Config
import React from "react";

// External components
import { Divider, Grid, Typography } from "@material-ui/core";

interface RecipesCalculationProps {
    recipesQty: number;
    peopleQty: number;
    totalPrice: number;
}

const RecipesCalculation = (props: RecipesCalculationProps) => {
    var rations = props.recipesQty * props.peopleQty;
    var rationPrice = !!rations ? props.totalPrice / rations : props.totalPrice;
    var fixedRationPrice = !!rations ? Math.round(rationPrice * 100) / 100 : rationPrice;

    return (
        <>
            {!!rations && (
                <>
                    <Typography variant="body1" paragraph>
                        {props.planVariantLabel || `${props.recipesQty} recetas para ${props.peopleQty} personas por semana`}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {rations} raciones a {fixedRationPrice} € por ración
                    </Typography>

                    <Divider />
                </>
            )}

            <Grid container style={{ paddingTop: 16 }}>
                <Grid item xs>
                    <Typography variant="body1" color="primary">
                        <b>Precio final</b>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" color="primary">
                        <b>{props.totalPrice} €/semana</b>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default RecipesCalculation;
