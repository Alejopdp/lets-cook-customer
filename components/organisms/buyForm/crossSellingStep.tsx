// Utils & config
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { getAdditionalPlans } from "@helpers";
import { useSnackbar } from "notistack";

// External components
import { Box, Button, Container, Grid, Icon } from "@material-ui/core";
import TitleBuyFlow from "components/molecules/titleBuyFlow/titleBuyFlow";
import AdditionalPlansGrid from "../additionalPlansGrid/additionalPlansGrid";
import { useBuyFlow, useCrossSellingStore } from "@stores";
import { Plan } from "types/plan";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core";
// Internal components

// Images & icons
import Payment from "@material-ui/icons/Payment";
import { CustomButton, RoundedButton } from "@atoms";

const CrossSellingStep = (props) => {
    const theme = useTheme();
    const form = useBuyFlow((state) => state.form);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [additionalPlans, setadditionalPlans] = useState<Plan[]>([]);
    const selectedPlans = useCrossSellingStore((state) => state.selectedPlans);

    useEffect(() => {
        const getAdditionalPlansByPlanId = async () => {
            const res = await getAdditionalPlans(router.locale, form.planCode);

            if (res.status === 200) {
                setadditionalPlans(res.data);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getAdditionalPlansByPlanId();
    }, []);

    const totalValue = useMemo(() => {
        if (selectedPlans) {
            const entries = Object.entries(selectedPlans);

            return entries.reduce((acc, entry) => entry[1].variant.price + acc, 0);
        } else {
            return undefined;
        }
    }, [selectedPlans]);

    const handleSubmitPayment = () => {
        enqueueSnackbar("Not implemented yet", { variant: "info" });
    };

    return (
        <Container maxWidth="lg" style={{ paddingTop: theme.spacing(6) }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleBuyFlow
                        title="Ya has seleccionado las recetas correctamente"
                        subtitle="¿Quieres agregar algún producto adicional?"
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                    <AdditionalPlansGrid additionalPlans={additionalPlans} />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        {totalValue > 0 && (
                            <RoundedButton
                                label={`PAGAR PRODUCTOS ADICIONALES (${totalValue} €)`}
                                onClick={handleSubmitPayment}
                                style={{ marginBottom: theme.spacing(2) }}
                            />
                        )}
                        <Button variant="text" onClick={() => router.push("/perfil")}>
                            No quiero agregar ningún producto adicional
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

CrossSellingStep.propTypes = {};
export default CrossSellingStep;
