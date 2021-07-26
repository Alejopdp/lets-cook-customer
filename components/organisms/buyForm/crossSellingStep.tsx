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

// Internal components

// Images & icons
import Payment from "@material-ui/icons/Payment";
import { CustomButton } from "@atoms";
import { useLang } from "@hooks";

const CrossSellingStep = (props) => {
    const form = useBuyFlow((state) => state.form);
    const router = useRouter();
    const [lang] = useLang('crossSellingStep');
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
        <Container maxWidth="lg">
            <Grid container spacing={1}>
                <Grid item container justify="center">
                    <TitleBuyFlow
                        title={lang.title}
                        subtitle={lang.subtitle}
                    />
                </Grid>

                <Grid item xs={12}>
                    <AdditionalPlansGrid additionalPlans={additionalPlans} />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        {totalValue && (
                            <CustomButton
                                text={lang.additionalProduct.replace(/totalValue/gi,totalValue)}
                                icon={<Payment />}
                                onClick={handleSubmitPayment}
                            />
                        )}
                        <Button variant="text">{lang.button}</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

CrossSellingStep.propTypes = {};

export default CrossSellingStep;
