// Utils & Config
import React from 'react';
import PropTypes from "prop-types";

// External components
import { Divider, Typography } from '@material-ui/core';

const RecipesCalculation = ({ recipesQty, peopleQty, totalPrice }) => {
    const rations = recipesQty * peopleQty;

    return (
        <>
            <Typography variant="body1" paragraph>
                {recipesQty} recetas para {peopleQty} personas por semana
            </Typography>

            <Typography variant="body1" paragraph>
                {rations} raciones a {totalPrice / rations} € por ración
            </Typography>

            <Divider />

            {/* Le iba a tirar un toFixed(2) pero retorna un string,
                dejo pendiente para mañana arreglar el float */}
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