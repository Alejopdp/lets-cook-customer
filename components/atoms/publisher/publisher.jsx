// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Icons & Images
import Image from "next/image";
import Avatar from "@material-ui/core/Avatar";

const Publisher = (props) => {
    return (
        <Grid container direction="row" alignItems="center">
            <Avatar style={{ marginRight: "8px" }}>LC</Avatar>
            <Typography variant="body2" style={{ marginRight: "48px" }}>
                Equipo Let's Cook
            </Typography>

            <Typography variant="body2">Publicado el 20 de marzo del 2021</Typography>
        </Grid>
    );
};

export default Publisher;
