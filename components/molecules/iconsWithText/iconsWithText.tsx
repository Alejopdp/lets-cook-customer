// Utils & Config
import React from "react";

// External components
import { Grid } from "@material-ui/core";

// Internal components
import { IconWithText } from "@atoms";
import { IconsWithTextProps, IconsType } from './interfaces';

const _icons: IconsType[] = [
    {
        src: "/assets/home/save-time.svg",
        text: "Economiza tu tiempo",
    },
    {
        src: "/assets/home/healthy-food.svg",
        text: "Come saludable y variado",
    },
    {
        src: "/assets/home/foodwaste.svg",
        text: "Combate el foodwaste",
    },
];

export const IconsWithText = ({ icons = _icons }: IconsWithTextProps) => {
    return (
        <Grid container spacing={2}>
            {icons.map((icon, index) => (
                <Grid item xs={4} style={{ textAlign: 'center' }}>
                    <IconWithText key={index} src={icon.src} text={icon.text} />
                </Grid>
            ))}
        </Grid>
    );
};

export default IconsWithText;
