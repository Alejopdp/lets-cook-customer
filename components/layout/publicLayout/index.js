// Utils & config
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Internal components
import Footer from "../../molecules/footer/footer";

const PublicLayout = (props) => {
    const theme = useTheme();

    return (
        <Container maxWidth={props.containerMaxWidth || "lg"}>
            <Grid container style={{ paddingTop: theme.spacing(12), paddingBottom: theme.spacing(8) }}>
                {props.children}
            </Grid>
        </Container>
    );
};

PublicLayout.propTypes = {};

export default PublicLayout;
