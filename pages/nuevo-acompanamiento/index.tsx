import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Layout } from "@layouts";
import InnerSectionLayout from "components/layout/innerSectionLayout";
import BackButtonTitle from "components/atoms/backButtonTitle/backButtonTitle";
import { Box, Grid, useTheme } from "@material-ui/core";
import AdditionalPlansGrid from "components/organisms/additionalPlansGrid/additionalPlansGrid";
import { RoundedButton } from "@atoms";
import AdditionalPlansBuyButtons from "components/molecules/additionalPlansBuyButtons/additionalPlansBuyButtons";
import { getAdditionalPlans, PlanVariant } from "@helpers";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { createManySubscriptions } from "helpers/serverRequests/subscription";
import { useUserInfoStore } from "@stores";

const NuevoAcompañamientoPage = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const [additionalPlans, setadditionalPlans] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedVariants, setselectedVariants] = useState<PlanVariant[]>([]);
    const userInfo = useUserInfoStore((state) => state.userInfo);

    useEffect(() => {
        const getAdditionalPlanList = async () => {
            const res = await getAdditionalPlans(router.locale);

            if (res.status === 200) {
                setadditionalPlans(res.data);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getAdditionalPlanList();
    }, []);

    const totalValue = useMemo(() => {
        return selectedVariants.reduce((acc, variant) => acc + variant.price, 0);
    }, [selectedVariants]);

    const handleSubmitPayment = async () => {
        const variants = selectedVariants.map((variant) => ({
            planId: variant.planId,
            variant: { id: variant.id },
            frequency: variant.frequency,
        }));
        const res = await createManySubscriptions(userInfo.id, variants);

        if (res.status === 200) {
            router.push("/perfil");
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    return (
        <Layout disableCallToActionSection disableFooterSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/perfil" title={"Acompañamientos"} />
                <Grid item xs={12} style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                    <AdditionalPlansGrid
                        selectedVariants={selectedVariants}
                        setselectedVariants={setselectedVariants}
                        additionalPlans={additionalPlans}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AdditionalPlansBuyButtons
                        totalValue={totalValue}
                        handleSubmitPayment={handleSubmitPayment}
                        handleSecondaryButtonClick={() => router.replace("/perfil")}
                        secondaryButtonLabel="POR EL MOMENTO NO QUIERO UN NUEVO ACOMPAÑAMIENTO"
                    />
                </Grid>
            </InnerSectionLayout>
        </Layout>
    );
};

NuevoAcompañamientoPage.propTypes = {};

export default NuevoAcompañamientoPage;
