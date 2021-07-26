// Utils & Config
import React from "react";

// External components
import { Grid } from "@material-ui/core";

// Internal components
import { IconWithText } from "@atoms";
import { IconsWithTextProps, IconsType } from './interfaces';

const _icons: IconsType[] = [
    {
        src: "/icons/checkout/ingredientes.svg",
        text: "Ingredientes frescos y naturales de proximidad en su cantidad exacta",
    },
    {
        src: "/icons/checkout/recetas-nuevas.svg",
        text: "Recetas nuevas todas las semanas, preparadas a medida por chefs",
    },
    {
        src: "/icons/checkout/gestion-del-plan.svg",
        text: "Podrás cancelar, cambiar o saltear semanas de tu plan facilmente",
    },
];

export const IconsWithText = ({ icons = _icons }: IconsWithTextProps) => {
    return (
        <Grid container spacing={2}>
            {icons.map((icon, index) => (
                <Grid item xs={4}>
                    <IconWithText key={index} src={icon.src} text={icon.text} />
                </Grid>
            ))}
        </Grid>
    );
};

export default IconsWithText;
