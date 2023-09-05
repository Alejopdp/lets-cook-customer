// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getSubscriptionById } from "../../helpers/serverRequests/userProfile";
import { getDataForSwappingAPlan } from "../../helpers/serverRequests/plans";
import { getRestrictions } from "../../helpers/serverRequests/restriction";
import { useLang } from "@hooks";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

// External Components

// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import PlanDetails from "../../components/organisms/planDetails";
import { localeRoutes, Routes } from "lang/routes/routes";

const PlanDetailsPage = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [lang] = useLang("planDetails");
    const [subscription, setSubscription] = useState({});
    const [swapPlanData, setSwapPlanData] = useState({});
    const [restrictions, setRestrictions] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getSubscriptionById(router.query.subscriptionId as string, router.locale);
            const swapPlanDataRes = await getDataForSwappingAPlan(router.query.subscriptionId as string, router.locale);
            const restrictionsRes = await getRestrictions(router.locale);

            if (
                res &&
                swapPlanDataRes &&
                restrictionsRes &&
                res.status === 200 &&
                swapPlanDataRes.status === 200 &&
                restrictionsRes.status === 200
            ) {
                setSubscription(res.data);
                setSwapPlanData(swapPlanDataRes.data);
                setRestrictions(restrictionsRes.data);
            } else {
                const errorMessage =
                    res?.data?.message || swapPlanDataRes?.data?.message || restrictionsRes?.data?.message || "Ocurrió un error inesperado";
                setError(errorMessage);
                enqueueSnackbar(errorMessage, { variant: "error" });
            }
            setIsLoading(false);
        };
        if (router.query.subscriptionId) {
            getData();
        }
    }, [counter, router.query]);

    return (
        <Layout disableCallToActionSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url={localeRoutes[router.locale][Routes.perfil]} title={lang.backButton} />
                {!isLoading && !!!error && (
                    <PlanDetails
                        subscription={subscription}
                        subscriptionId={subscription.id}
                        swapPlanData={swapPlanData}
                        restrictions={restrictions}
                        reload={() => setCounter(counter + 1)}
                    />
                )}
            </InnerSectionLayout>
        </Layout>
    );
};

export default PlanDetailsPage;
