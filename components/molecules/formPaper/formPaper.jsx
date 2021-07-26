// Utils & config
import React from "react";
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Grid, Container } from "@material-ui/core";

const FormPaper = (props) => {
    const { image, shadow, box, mt1, mb2 } = useStyles();

    return (
        <Container maxWidth='md' style={{marginBottom: '40px'}}>
            <Grid container style={{ justifyContent: 'center', minHeight: '600px' }}>
                <Grid item xs={6} md={6} className={clsx(image, shadow)} />
                <Grid item xs={12} sm={8} md={6}>
                    <Box className={clsx(box, shadow)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} className={mb2}>
                                <Typography variant="h5" color="textSecondary">
                                    {props.title}
                                </Typography>
                                {props.paragraph &&
                                    <Typography variant="body2" color="textSecondary" className={mt1}>
                                        {props.paragraph}
                                    </Typography>
                                }
                            </Grid>
                            {props.children}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

FormPaper.propTypes = {
    title: PropTypes.string.isRequired,
    width: PropTypes.number,
    paragraph: PropTypes.string,
};

export default FormPaper;
