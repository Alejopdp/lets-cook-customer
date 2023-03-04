// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Image from "next/image";

const EmptyState = (props) => {
    const theme = useTheme();

    return (
        <Container maxWidth="sm">
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <Image unoptimized src={props.image || "/empty-state.png"} alt="búsqueda vacía" width={150} height={150} />
                <Typography variant="h6" color="textPrimary" style={{ marginTop: theme.spacing(3) }}>
                    {props.title}
                </Typography>
                {props.text && (
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: theme.spacing(1) }}>
                        {props.text}
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};

EmptyState.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default EmptyState;
