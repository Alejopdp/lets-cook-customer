// Utils & Config
import React from "react";

// External components
import { Typography, useTheme } from "@material-ui/core";
import Image from "next/image";
import { IconWithTextProps } from "./interfaces";

export const IconWithText = (props: IconWithTextProps) => {
    const theme = useTheme();

    return (
        <>
            <Image src={props.src} height={40} width={40} />
            <Typography variant="subtitle2" style={{ fontSize: "14px", fontWeight: 600, marginTop: theme.spacing(1) }}>
                {props.text}
            </Typography>
        </>
    );
};
export default IconWithText;
