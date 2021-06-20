import React from 'react';
import CustomButton from '../../components/atoms/customButton/customButton';
import PlanWithIcon from '../../components/atoms/planWithIcon/planWithIcon';
import { Box, Grid, Typography } from '@material-ui/core';
import PlanSize from '../../components/molecules/planSize/planSize';
import RecipesCalculation from '../../components/molecules/recipesCalculation/recipesCalculation';

const Kriss = () => {

    const plans = [
        {
            name: "Plan Familiar",
            description: "Plan Familiar lorem ipsum dolor sit amet",
            icon: "/icons/plans/plan-familiar.svg",
            checkedIcon: "/icons/plans/plan-familiar-color.svg",
        },
        {
            name: "Plan Gourmet",
            description: "Plan Gourmet lorem ipsum dolor sit amet",
            icon: "/icons/plans/plan-gourmet.svg",
            checkedIcon: "/icons/plans/plan-gourmet-color.svg",
        },
        {
            name: "Plan Ahorro",
            description: "Plan Ahorro lorem ipsum dolor sit amet",
            icon: "/icons/plans/plan-ahorro.svg",
            checkedIcon: "/icons/plans/plan-ahorro-color.svg",
        },
        {
            name: "Plan Vegetariano",
            description: "Plan Vegetariano lorem ipsum dolor sit amet",
            icon: "/icons/plans/plan-vegetariano.svg",
            checkedIcon: "/icons/plans/plan-vegetariano-color.svg",
        },
        {
            name: "Plan Vegano",
            description: "Plan Vegano lorem ipsum dolor sit amet",
            icon: "/icons/plans/plan-vegano.svg",
            checkedIcon: "/icons/plans/plan-vegano-color.svg",
        },
        {
            name: "Plan X",
            description: "Plan X lorem ipsum dolor sit amet",
            icon: "/icons/plans/plan-familiar.svg",
            checkedIcon: "/icons/plans/plan-familiar-color.svg",
        },
    ]

    return (
        // Kriss:
        // El layout esta bastante choto, la idea era mostrar los componentes nada mas
        // No sé si querés manejar el layout con grids o con flex
        // Los checkboxs de planes y de cantidad de planes tienen un checkeo hardcodeado en una constante,
        // No les hice un estado porque calculo que lo vamos a manejar de manera global
        // Cualquier cosa organizamos un call para esta tarde o mañana!
        // Un abrazo man

        <Grid container direction="column" justify="center" alignItems="center">
            <Typography variant="h5">
                1. Elige tu plan
            </Typography>

            <Grid item container direction="row" justify="center">
                {plans.map((plan, index) => (
                    <PlanWithIcon
                        key={index}
                        icon={plan.icon}
                        checkedIcon={plan.checkedIcon}
                        name={plan.name}
                    />
                ))}
            </Grid>

            <Typography variant="body1">
                Descripción del producto seleccionado
            </Typography>

            <Grid item >
                <Typography variant="h5">
                    2. Elige el tamaño de tu plan
                </Typography>

                <PlanSize subtitle="Cantidad de personas" />
                <PlanSize subtitle="Cantidad de recetas por semana" />

                <RecipesCalculation
                    recipesQty={4}
                    peopleQty={3}
                    // el totalPrice no sé de donde vendría
                    totalPrice={40}
                />
            </Grid>

            <Box width="200px">
                <CustomButton
                    text="Seleccionar plan"
                    onClick={()=>{}}
                />
            </Box>

            <Typography variant="body1">
                Podrás elegir las recetas en el último paso. Cada semana cambiamos las recetas.
            </Typography>
        </Grid>
    )
}

export default Kriss;
