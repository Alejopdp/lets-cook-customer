// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getSubscriptionById } from "../../helpers/serverRequests/userProfile";
import { getDataForSwappingAPlan } from "../../helpers/serverRequests/plans";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components

// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import PlanDetails from "../../components/organisms/planDetails";

export async function getServerSideProps(context) {
    const subscriptionId = context.params.subscriptionId;
    const locale = context.locale;
    const res = await getSubscriptionById(subscriptionId, locale);
    const swapPlanDataRes = await getDataForSwappingAPlan(subscriptionId, locale);

    return {
        props: {
            subscription: res.data || null,
            error: res.status !== 200 || swapPlanDataRes.status !== 200 ? "ERROR" : "",
            subscriptionId: subscriptionId,
            swapPlanData: swapPlanDataRes.data || null,
        },
    };
}

const PlanDetailsPage = ({ subscription, error, subscriptionId, swapPlanData }) => {
    const theme = useTheme();
    // const lang = langs[router.locale];

    return (
        <Layout disableCallToActionSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/perfil" title="Detalle del plan" />
                <PlanDetails subscription={subscription} subscriptionId={subscriptionId} swapPlanData={swapPlanData} />
            </InnerSectionLayout>
        </Layout>
    );
};

export default PlanDetailsPage;
