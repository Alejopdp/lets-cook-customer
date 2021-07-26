import React, { memo } from "react";
import { useBuyFlow } from "@stores";
import { Container, Grid, Typography, useTheme } from "@material-ui/core";
import { ShipmentForm, PaymentForm, IconsWithText } from "@molecules";
import CheckoutDetails from "../checkoutDetails";


interface CheckoutStepProps {
    // handleSubmitPayment: () => void;
}
export const CheckoutStep = memo((props: CheckoutStepProps) => {
    const theme = useTheme();

    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChangeAccordion = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : (expanded === 'panel2') ? 'panel2' : 'panel1');
        // setExpanded(isExpanded ? panel : false);
    };

    const changeToSecondStep = () => {
        setExpanded('panel2');
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Container style={{ maxWidth: '650px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src='/icons/checkout/verified.svg' width={24} height={24} />
                                    <Typography variant="h5" style={{ marginLeft: theme.spacing(1) }}>Pago 100% seguro</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <ShipmentForm expanded={expanded} handleChangeAccordion={handleChangeAccordion} handleChangeStep={changeToSecondStep} />
                            </Grid>
                            <Grid item xs={12}>
                                <PaymentForm expanded={expanded} handleChangeAccordion={handleChangeAccordion} />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: theme.spacing(4) }}>
                                <IconsWithText />
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CheckoutDetails />
                </Grid>
            </Grid>
        </>
    );
});

export default CheckoutStep;
