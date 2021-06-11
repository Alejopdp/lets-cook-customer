// Utils & Config
import React from'react';

// External components
import { Grid } from '@material-ui/core';

// Internal components
import IconWithText from '../../atoms/iconWithText/iconWithText';

const IconsWithText = () => {
    const icons = [
        {
            src: "/icons/checkout/ingredientes.svg",
            text: "Ingredientes frescos y naturales de proximidad en su cantidad exacta",
        },
        {
            src: "/icons/checkout/recetas-nuevas.svg",
            text: "Recetas nuevas todas las semanas, preparadas a medida por chefs"
        },
        {
            src: "/icons/checkout/gestion-del-plan.svg",
            text: "Podrás cancelar, cambiar o saltear semanas de tu plan facilmente"
        }
    ]

    return (
        <Grid item container justify="space-around" style={{marginTop: "16px"}}>
            {icons.map((icon, index) => (
                <IconWithText key={index} src={icon.src} text={icon.text} />
            ))}
        </Grid>
    )
}

export default IconsWithText;