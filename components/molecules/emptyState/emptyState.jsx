// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({

}));

const EmptyState = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Container maxWidth="sm">
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Image src="/empty-state.png" alt="búsqueda vacía" width={256} height={256} />
                <Typography variant="h6" color="textPrimary" style={{ marginBottom: theme.spacing(2) }}>
                    {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {props.text}
                </Typography>
            </Grid>
        </Container>

    );
};

EmptyState.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default EmptyState;
