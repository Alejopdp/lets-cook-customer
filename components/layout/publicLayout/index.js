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
        <Box minHeight="100vh">
            <Box height="64px">Navbar</Box>
            <Container maxWidth={props.containerMaxWidth || "lg"} style={{ paddingBottom: theme.spacing(10) }}>
                <Grid container>
                    {props.children}
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
};

PublicLayout.propTypes = {};

export default PublicLayout;
