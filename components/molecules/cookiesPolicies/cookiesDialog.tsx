import React, { useState } from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { Grid, Typography, Paper, Hidden, Button } from "@material-ui/core";
import { useCookiesStore } from "stores/cookies";

const useStyles = makeStyles((theme: Theme) => ({
    grid: {
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 5,
    },
    paper: {
        [theme.breakpoints.down("md")]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        [theme.breakpoints.up("md")]: {
            paddingRight: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        borderWidth: 0,
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        minHeight: "100%",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 3px 24px rgba(0, 0, 0, 0.08)",
    },
}));

export default function CookiesDialog() {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const { hasAcceptedCookies, setHasAcceptedCookies } = useCookiesStore((state) => ({
        hasAcceptedCookies: state.hasAcceptedCookies,
        setHasAcceptedCookies: state.setHasAcceptedCookies,
    }));

    const handleCookies = (hasAccepted: boolean) => {
        setHasAcceptedCookies(hasAccepted);
        // TO DO: Handle 3rd party cookies depending on the accepted value
    };

    return (
        <>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.grid}>
                <Grid item xs={10} sm={8} md={6} lg={4} style={{ marginBottom: "20px" }}>
                    <Paper className={classes.paper}>
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xs={12} md={9}>
                                <Typography variant="body1" align="center" style={{ color: "black" }}>
                                    En <span style={{ fontWeight: "bold" }}>Let's cook now.</span> usamos{" "}
                                    <span style={{ textDecoration: "underline" }}>cookies</span> de terceros para poder personalizar tu
                                    experiencia en nuestro sitio.
                                </Typography>
                            </Grid>
                            <Hidden smDown>
                                <Grid item xs={12} md={3} container direction="column" alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Button onClick={() => handleCookies(true)} color="primary">
                                            Aceptar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button onClick={() => handleCookies(false)} style={{ color: "red" }}>
                                            Rechazar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Hidden>
                            <Hidden mdUp>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={2}
                                    style={{ marginTop: "10px" }}
                                >
                                    <Grid item>
                                        <Button onClick={() => handleCookies(true)} color="primary">
                                            Aceptar
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => handleCookies(false)} style={{ color: "red" }}>
                                            Rechazar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
