// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getSubscriptionById } from "../../helpers/serverRequests/userProfile";
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

    return {
        props: {
            subscription: res.data || null,
            error: res.status !== 200 ? "ERROR" : "",
            subscriptionId: subscriptionId,
        },
    };
}

const PlanDetailsPage = ({ subscription, error, subscriptionId }) => {
    const theme = useTheme();
    // const lang = langs[router.locale];

    console.log(subscription, error, subscriptionId);

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/perfil" title="Detalle del plan" />
                <PlanDetails data={subscription} subscriptionId={subscriptionId} />
            </InnerSectionLayout>
        </Layout>
    );
};

export default PlanDetailsPage;
