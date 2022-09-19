import React from "react";
import { Container, Grid, Typography, useTheme } from "@material-ui/core";
import { RoundedButton } from "@atoms";
import GeneralBox from "components/atoms/generalBox/generalBox";
import { useLang } from "@hooks";

const PurchaseConfirmationBonoRegalo = () => {
    const theme = useTheme();
    const [lang] = useLang("bonoRegalo");

    return (
        <Container style={{ margin: "auto" }}>
            <Grid item container xs={12} sm={8} md={6} style={{ margin: "auto" }}>
                <GeneralBox variant="large">
                    <Grid container spacing={2} style={{ textAlign: "center" }}>
                        <Grid item xs={12}>
                            <img src="/purchase-confirmation.svg" style={{ height: "80px" }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h3" color="textPrimary">
                                {lang.purchaseConfirmation.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                                {lang.purchaseConfirmation.subtitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                            <Typography variant="subtitle2" color="textSecondary">
                                {lang.purchaseConfirmation.bonoRegaloCode}
                            </Typography>
                            <Typography variant="h3" color="primary">
                                LC00K123
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RoundedButton label="Ir a mi perfil" onClick={() => alert("perfil")} style={{ width: "100%" }} />
                        </Grid>
                    </Grid>
                </GeneralBox>
            </Grid>
        </Container>
    );
};

export default PurchaseConfirmationBonoRegalo;
