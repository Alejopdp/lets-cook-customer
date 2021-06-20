// Utils & Config
import React from 'react';
import PropTypes from "prop-types";

// External components
import { Divider, Typography } from '@material-ui/core';

const RecipesCalculation = ({ recipesQty, peopleQty, totalPrice }) => {
    var rations = recipesQty * peopleQty;
    var rationPrice = totalPrice / rations;
    var fixedRationPrice = Math.round(rationPrice * 100) / 100;

    return (
        <>
            <Typography variant="body1" paragraph>
                {recipesQty} recetas para {peopleQty} personas por semana
            </Typography>

            <Typography variant="body1" paragraph>
                {rations} raciones a {fixedRationPrice} € por ración
            </Typography>

            <Divider />

            <Typography variant="body1" color="primary">
                <b>Precio final {totalPrice} €/semana</b>
            </Typography>
        </>
    )
}

RecipesCalculation.propTypes = {
    recipesQty: PropTypes.number.isRequired,
    peopleQty: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
};

export default RecipesCalculation;