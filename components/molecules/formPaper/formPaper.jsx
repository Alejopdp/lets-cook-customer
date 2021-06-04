// Utils & config
import React from "react";
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import { Grid } from "@material-ui/core";

const FormPaper = (props) => {
    const { margin, paper, image, shadow, displayImage, title } = useStyles();

    return (
        <Box width={props.fullWidth ? "100%" : props.width} className={margin}>
            <Grid item container direction="row" justify="center">
                <Box className={displayImage}>
                    <Image
                        src="/assets/beneficios.jpg"
                        width={500}
                        height={620}
                        // layout="fixed"
                        className={clsx(image, shadow)}
                    />
                </Box>

                <Paper className={clsx(paper, shadow)}>
                    <Typography variant="h5" color="textSecondary" className={title}>
                        {props.title}
                    </Typography>
                    {props.paragraph &&
                        <Typography variant="body2" className={title}>
                            {props.paragraph}
                        </Typography>
                    }
                    {props.children}
                </Paper>
            </Grid>
        </Box>
    );
};

FormPaper.propTypes = {
    title: PropTypes.string.isRequired,
    width: PropTypes.number,
    fullWidth: PropTypes.bool,
    paragraph: PropTypes.string,
};

export default FormPaper;
