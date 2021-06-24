// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components

// Internal components
import InnerSectionLayout from "../../components/layout/publicLayout";
import Layout from '../../components/layout/index';
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import PlanDetails from "../../components/organisms/planDetails";

const useStyles = makeStyles((theme) => ({
    nextChargeGrid: {
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2)
        },
        [theme.breakpoints.up('sm')]: {
            borderLeft: '2px dashed #E5E5E5',
            paddingLeft: theme.spacing(4)
        },
    }
}));

const PlanDetailsPage = () => {
    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/perfil" title="Detalle del plan" />
                <PlanDetails />
            </InnerSectionLayout>
        </Layout>
    );
};

export default PlanDetailsPage;
