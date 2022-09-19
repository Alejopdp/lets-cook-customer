import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Hidden, Button } from "@material-ui/core";
import { useCookiesStore } from "../../../stores/cookies";
import { LOCAL_STORAGE_KEYS, useLang, useLocalStorage } from "@hooks";
import PrivacyPolicyModal from "../legalModals/privacyPolicyModal";

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
    const [lang] = useLang("cookiesDialog");
    const { saveInLocalStorage } = useLocalStorage();
    const [openPrivacyPolicyModal, setOpenPrivacyPolicyModal] = React.useState(false);
    const { setHasAcceptedCookies } = useCookiesStore((state) => ({
        hasAcceptedCookies: state.hasAcceptedCookies,
        setHasAcceptedCookies: state.setHasAcceptedCookies,
    }));

    const handleCookies = (hasAccepted: boolean) => {
        if (hasAccepted) saveInLocalStorage(LOCAL_STORAGE_KEYS.HAS_ACCEPTED_COOKIES, true);
        setHasAcceptedCookies(true);
        // TO DO: Handle 3rd party cookies depending on the accepted value
    };

    const handleClosePrivacyPolicyModal = () => {
        setOpenPrivacyPolicyModal(false);
    };

    return (
        <>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.grid}>
                <Grid item xs={10} sm={8} md={6} lg={4} style={{ marginBottom: "20px" }}>
                    <Paper className={classes.paper}>
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xs={12} md={9}>
                                <Typography
                                    variant="body1"
                                    align="center"
                                    style={{ color: "black", cursor: "pointer" }}
                                    onClick={() => setOpenPrivacyPolicyModal(true)}
                                >
                                    {lang.text}
                                </Typography>
                            </Grid>
                            <Hidden smDown>
                                <Grid item xs={12} md={3} container direction="column" alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Button onClick={() => handleCookies(true)} color="primary">
                                            {lang.acceptButton}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button onClick={() => handleCookies(false)} style={{ color: "red" }}>
                                            {lang.denyButton}
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
                                            {lang.acceptButton}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => handleCookies(false)} style={{ color: "red" }}>
                                            {lang.denyButton}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Paper>
                </Grid>
                <PrivacyPolicyModal open={openPrivacyPolicyModal} handleClose={handleClosePrivacyPolicyModal} />
            </Grid>
        </>
    );
}
