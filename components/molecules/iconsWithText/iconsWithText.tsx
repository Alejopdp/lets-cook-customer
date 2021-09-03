// Utils & Config
import React from "react";

// External components
import { Grid } from "@material-ui/core";

// Internal components
import { IconWithText } from "@atoms";
import { IconsWithTextProps, IconsType } from './interfaces';


export const IconsWithText = (props: IconsWithTextProps) => {
    const lang = props.lang;

    const icons: IconsType[] = [
        {
            src: "/assets/home/save-time.svg",
            text: lang.firstItem
        },
        {
            src: "/assets/home/healthy-food.svg",
            text: lang.secondItem
        },
        {
            src: "/assets/home/foodwaste.svg",
            text: lang.thirdItem
        },
    ];

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
