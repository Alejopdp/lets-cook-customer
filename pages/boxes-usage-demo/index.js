// Utils & Config
import React from "react";
import { useRouter } from "next/router";
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

const PlanDetails = () => {
    const theme = useTheme();
    const router = useRouter();
    // const lang = langs[router.locale];


    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <GeneralBox>
                                <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                                    Contenido del componente GeneralBox (/atoms/generalBox/generalBox)
                                </Typography>
                            </GeneralBox>
                        </Grid>
                        <Grid item>
                            <BoxWithTitle title='BoxWithTitle'>
                                <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                                    Contenido del componente BoxWithTitle (/molecules/specificBox/boxWithTitle)
                                </Typography>
                            </BoxWithTitle>
                        </Grid>
                        <Grid item>
                            <BoxWithTitleAndTextButton title='BoxWithTitleAndTextButton' btnText='button text'>
                                <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                                    Contenido del componente BoxWithTitleAndTextButton (/molecules/specificBox/BoxWithTitleAndTextButton)
                                </Typography>
                            </BoxWithTitleAndTextButton>
                        </Grid>
                        <Grid item>
                            <BoxWithTextButton btnText='button text'>
                                <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                                    Contenido del componente BoxWithTextButton (/molecules/specificBox/BoxWithTextButton)
                                </Typography>
                            </BoxWithTextButton>
                        </Grid>
                        <Grid item>
                            <BoxWithTextButton btnText='button text'>
                                <PlanInfoWithStatus style={{ marginBottom: theme.spacing(1) }} planName='Plan Familiar' planIcon='/assets/plan-test-color.svg' status={{ value: 'active', text: 'activo' }} />
                                <PlanInfo style={{ marginBottom: theme.spacing(1) }} planName='Plan Familiar' planIcon='/assets/plan-test-color.svg' />
                                <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                                    Contenido del componente BoxWithTextButton (/molecules/specificBox/BoxWithTextButton)
                                </Typography>
                            </BoxWithTextButton>
                        </Grid>
                    </Grid>
                </Grid>
            </InnerSectionLayout>
        </Layout>
    );
};

export default PlanDetails;
