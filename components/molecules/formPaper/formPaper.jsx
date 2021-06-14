// Utils & config
import React from "react";
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const FormPaper = (props) => {
    const { margin, paper, image, shadow, title } = useStyles();

    return (
        <Grid item container direction="row" justify="center" className={margin}>
            <Box className={clsx(image, shadow)}></Box>

            <Paper className={clsx(paper, shadow)} id="paper">
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
    );
};

FormPaper.propTypes = {
    title: PropTypes.string.isRequired,
    width: PropTypes.number,
    paragraph: PropTypes.string,
};

export default FormPaper;
