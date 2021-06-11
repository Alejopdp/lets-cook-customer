// Utils & Config
import React from 'react';
import PropTypes from "prop-types";

// External components
import { Box, Typography } from '@material-ui/core';
import Image from "next/image";

const IconWithText = ({ src, text }) => {
    return (
        <Box width="200px">
            <Image src={src} height={60} width={60} />

            <Typography variant="body1">
                <b>{text}</b>
            </Typography>
        </Box>
    )
}

IconWithText.propTypes = {
    src: PropTypes.string,
    text: PropTypes.string,
};

export default IconWithText;
