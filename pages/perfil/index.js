// Utils & Config
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";
// const langs = require("../../lang").comoFunciona;
import { getProfileInfo } from '../../helpers/serverRequests/userProfile';

// External Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Internal components
import InnerSectionLayout from "../../components/layout/publicLayout";
import Layout from "../../components/layout/index";
import BoxWithIconAndTextButton from "../../components/molecules/specificBox/boxWithIconAndTextButton";
import TextButton from "../../components/atoms/textButton/textButton";
import PlanRecoverModal from "../../components/molecules/planRecoverModal/planRecoverModal";
import PlanProfileCard from "./planProfileCard"
import ProfileTitleWithButton from "./profileTitleWithButton"
import ChooseRecipesActionBox from './pendingActionsComponents/chooseRecipesActionBox'
import RateRecipesActionBox from './pendingActionsComponents/rateRecipesActionBox'
import ReferalActionBox from './pendingActionsComponents/referalActionBox'
import EmptyState from '../../components/molecules/emptyState/emptyState';


export async function getServerSideProps(context) {
    const customerWithoutPlans = '2fc469f0-0f3e-4658-8370-185735985da9'
    const customerWithPlans = 'f031ca8c-647e-4d0b-8afc-28e982068fd5'
    const customerId = customerWithPlans

    const locale = context.locale
    const res = await getProfileInfo(customerId, locale);

    return {
        props: {
            data: res.data || null,
            error: res.status !== 200 ? "ERROR" : "",
        }
    }
}

const Perfil = ({ data, error }) => {
    console.log(data)
    const theme = useTheme();
    const router = useRouter();
    const [openPlanRecoverModal, setOpenPlanRecoverModal] = useState(false);
    // const lang = langs[router.locale];

    const endpoint = "http://localhost:3001/api/v1/subscription/by-customer/1";

    const handleClickOpenPlanRecoverModal = async () => {
        setOpenPlanRecoverModal(true);
        const res = fetch(endpoint).then(async response => {
            try {
                const data = await response.json()
                console.log('response data?', data)
            } catch (error) {
                console.log('Error happened here!')
                console.error(error)
            }
        })
        console.log(res);
    };

    const handleClosePlanRecoverModal = () => {
        setOpenPlanRecoverModal(false);
    };

    const handleClickRedirectToPlanDetail = (subscriptionId) => {
        router.push({ pathname: `/detalle-del-plan/${subscriptionId}` })
    }

    /* const descriptionElementRefRecipeModal = useRef(null);

    useEffect(() => {
        if (openPlanRecoverModal) {
            const { current: descriptionElement } = descriptionElementRefRecipeModal;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openPlanRecoverModal]); */

    const getPendingActionComponent = (data) => {
        switch (data.type) {
            case 'choose_recipes':
                return <ChooseRecipesActionBox data={data} />
            case 'rate_recipes':
                return <RateRecipesActionBox />
            case 'invite_code':
                return <ReferalActionBox data={data} />
            default:
                return <p>unknown action</p>
        }
    }

    return (
        <>
            <Layout>
                <InnerSectionLayout containerMaxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Grid container direction="column" alignItems="left" spacing={2} >
                                <Grid item style={{ marginBottom: theme.spacing(3) }}>
                                    <Typography variant="h4" style={{ fontSize: "24px", color: theme.palette.text.black }}>
                                        Hola Alejo
                                    </Typography>
                                </Grid>
                                <Grid item style={{ marginBottom: theme.spacing(1) }}>
                                    <Link href="/historial-pagos">
                                        <TextButton style={{ marginRight: "14px" }} noColor icon="time" btnText="Historial de pagos" />
                                    </Link>
                                </Grid>
                                <Grid item style={{ marginBottom: theme.spacing(5) }}>
                                    <Link href="/configuracion">
                                        <TextButton noColor icon="settings" btnText="Configuración" />
                                    </Link>
                                </Grid>
                                {data.pendingActions.map((action, index) => (
                                    <Grid item xs={12}>
                                        {getPendingActionComponent(action)}
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container justify="space-between" direction="row" alignItems="center" spacing={2} style={{ marginBottom: theme.spacing(3) }}>
                                <ProfileTitleWithButton title='Mis planes' btnText='Nuevo plan' />
                            </Grid>
                            <Grid container spacing={2} style={{ marginBottom: theme.spacing(5) }}>
                                {data.principalPlanSubscriptions.length > 0 ? (
                                    <>
                                        {data.principalPlanSubscriptions.map((plan, index) => (
                                            <Grid item sm={6} xs={12}>
                                                <PlanProfileCard plan={plan} handleClickOpenPlanRecoverModal={handleClickOpenPlanRecoverModal} handleClickRedirectToPlanDetail={handleClickRedirectToPlanDetail} />
                                            </Grid>
                                        ))}
                                    </>
                                ) : (
                                        <EmptyState image="/emptyStatePlans.png" title='Aún no tienes planes' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' />
                                    )}
                            </Grid>
                            {data.principalPlanSubscriptions.length > 0 && (
                                <>
                                    <Grid container justify="space-between" direction="row" alignItems="center" spacing={2} style={{ marginBottom: theme.spacing(3) }}>
                                        <ProfileTitleWithButton title='Mis acompañamientos' btnText='Nuevo acompañamiento' />
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginBottom: theme.spacing(5) }}>
                                        {data.additionalPlanSubscriptions.length > 0 ? (
                                            <>
                                                {data.additionalPlanSubscriptions.map((plan, index) => (
                                                    <Grid item sm={6} xs={12}>
                                                        <PlanProfileCard plan={plan} handleClickOpenPlanRecoverModal={handleClickOpenPlanRecoverModal} handleClickRedirectToPlanDetail={handleClickRedirectToPlanDetail} />
                                                    </Grid>
                                                ))}
                                            </>
                                        ) : (
                                                <EmptyState image="/emptyStatePlans.png" title='Aún no tienes acompañamientos' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' />
                                            )}
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </InnerSectionLayout>
            </Layout>
            <PlanRecoverModal open={openPlanRecoverModal} handleClose={handleClosePlanRecoverModal} />
        </>
    );
};

export default Perfil;
