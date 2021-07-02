// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Box, Typography } from "@material-ui/core";
import Image from "next/image";
import { IconWithTextProps } from "./interfaces";

export const IconWithText = (props: IconWithTextProps) => {
    return (
        <Box width="200px">
            <Image src={props.src} height={60} width={60} />

            <Typography variant="body1">
                <b>{props.text}</b>
            </Typography>
        </Box>
    );
};
export default IconWithText;
