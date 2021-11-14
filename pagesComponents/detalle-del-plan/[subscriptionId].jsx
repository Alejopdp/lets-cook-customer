// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getSubscriptionById } from "../../helpers/serverRequests/userProfile";
import { getDataForSwappingAPlan } from "../../helpers/serverRequests/plans";
import { getRestrictions } from "../../helpers/serverRequests/restriction";
import { useLang } from "@hooks";
import { localeRoutes, Routes } from "../../lang/routes/routes";

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
    const restrictionsRes = await getRestrictions(locale);

    return {
        props: {
            subscription: res.data || null,
            error: res.status !== 200 || swapPlanDataRes.status !== 200 ? "ERROR" : "",
            subscriptionId: subscriptionId,
            swapPlanData: swapPlanDataRes.data || null,
            restrictions: restrictionsRes.data || null,
        },
    };
}

const PlanDetailsPage = ({ subscription, error, subscriptionId, swapPlanData, restrictions }) => {
    const theme = useTheme();
    const [lang] = useLang("planDetails");

    return (
        <Layout disableCallToActionSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url={localeRoutes[router.locale][Routes.perfil]} title={lang.backButton} />
                <PlanDetails
                    subscription={subscription}
                    subscriptionId={subscriptionId}
                    swapPlanData={swapPlanData}
                    restrictions={restrictions}
                    lang={lang}
                />
            </InnerSectionLayout>
        </Layout>
    );
};

export default PlanDetailsPage;
