// Utils & Config
import React from "react";
import { useLang } from "@hooks";

// External components
import { Divider, Grid, Typography } from "@material-ui/core";

interface RecipesCalculationProps {
    recipesQty: number;
    peopleQty: number;
    totalPrice?: number;
    price: number;
    priceWithOffer: number;
}

const RecipesCalculation = (props: RecipesCalculationProps) => {
    var rations = props.recipesQty * props.peopleQty;
    var rationPrice = !!rations ? props.totalPrice / rations : props.totalPrice;
    var fixedRationPrice = !!rations ? Math.round(rationPrice * 100) / 100 : rationPrice;
    const [lang] = useLang("recipesCalculation");

    return (
        <>
            {!!rations && (
                <>
                    <Typography variant="body1" paragraph>
                        {props.planVariantLabel || `${props.recipesQty} ${lang.recipesFor} ${props.peopleQty} ${lang.peoplePerWeek}`}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {rations} {lang.meals} {fixedRationPrice} {lang.eurosPerMeal}
                    </Typography>

                    <Divider />
                </>
            )}

            <Grid container style={{ paddingTop: 16 }}>
                <Grid item xs>
                    <Typography variant="body1" color="primary">
                        <b>{lang.finalPrice}</b>
                    </Typography>
                </Grid>
                <Grid item>
                    {props.priceWithOffer ? (
                        <Typography variant="body1" color="primary">
                            <span style={{ textDecoration: 'line-through', fontSize: '14px', color: '#515151' }}>{props.price} €</span><b> {props.priceWithOffer} {lang.eurosPerWeek}</b>
                        </Typography>
                    ) : (
                            <Typography variant="body1" color="primary">
                                <b>{props.price} {lang.eurosPerWeek}</b>
                            </Typography>
                        )}
                </Grid>
            </Grid>
        </>
    );
};

export default RecipesCalculation;
