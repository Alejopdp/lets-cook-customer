// Utils & Config
import React from "react";
// import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
// const langs = require("../../lang").comoFunciona;

// External Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Internal components
import InnerSectionLayout from "../../components/layout/publicLayout";
import Layout from '../../components/layout/index';
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import GeneralBox from "../../components/atoms/generalBox/generalBox";
import BoxWithTitle from "../../components/molecules/specificBox/boxWithTitle";
import BoxWithTitleAndTextButton from "../../components/molecules/specificBox/boxWithTitleAndTextButton";
import BoxWithTextButton from "../../components/molecules/specificBox/boxWithTextButton";
import PlanInfoWithStatus from "../../components/molecules/planInfo/planInfoWithStatus";
import PlanInfo from "../../components/molecules/planInfo/planInfo";
import DataDisplayEditable from "../../components/molecules/dataDisplay/dataDisplayEditable";
import DataDisplay from "../../components/molecules/dataDisplay/dataDisplay";

const PlanDetails = () => {
    const theme = useTheme();
    // const router = useRouter();
    // const lang = langs[router.locale];

    const data = {
        plan: {
            name: 'Plan Familiar',
            icon: '/assets/plan-test-color.svg',
            status: { value: 'active', text: 'activo' },
            variantInfo: '4 recetas para 3 personas por semana',
            variantExtraInfo: '12 raciones a 3 € por ración',
            priceText: 'Valor total: 36 €/semana'
        }
    }

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/perfil" title="Detalle del plan" />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <BoxWithTextButton btnText='cambiar plan'>
                                    <PlanInfoWithStatus style={{ marginBottom: theme.spacing(2) }} planName={data.plan.name} planIcon={data.plan.icon} status={{ value: data.plan.status.value, text: data.plan.status.text }} />
                                    <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(1) }}>
                                        {data.plan.variantInfo}
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(1) }}>
                                        {data.plan.variantExtraInfo}
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', fontWeight: 600 }}>
                                        {data.plan.priceText}
                                    </Typography>
                                </BoxWithTextButton>
                            </Grid>
                            <Grid item xs={12}>
                                <BoxWithTitle title='Dirección de entrega'>
                                    <DataDisplay title='Dirección' text='Calle Ing Fausto Elio 42, 46001, Valencia' style={{ marginBottom: theme.spacing(2) }} />
                                    <DataDisplay title='Piso / Puerta / Aclaraciones' text='Piso 2, Puerta 10' style={{ marginBottom: theme.spacing(2) }} />
                                    <DataDisplay title='Dirección' text='Sin indicar' />
                                </BoxWithTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <BoxWithTitle title='Método de pago'>
                                    <DataDisplay title='Tarjeta' text='Visa terminada en 0123' style={{ marginBottom: theme.spacing(2) }} />
                                    <DataDisplay title='Vencimiento' text='Expira el 10/25' />
                                </BoxWithTitle>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <BoxWithTitleAndTextButton title='Calendario' btnText='saltar semana'>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <DataDisplay title='Próxima entrega' text='Martes 12 de Junio' />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <DataDisplay title='Próximo cargo' text='Sábado 9 de Junio' />
                                        </Grid>
                                    </Grid>
                                </BoxWithTitleAndTextButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </InnerSectionLayout>
        </Layout>
    );
};

export default PlanDetails;
