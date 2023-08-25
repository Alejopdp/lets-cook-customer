// Utils & Config
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {  useTheme, Icon, Container, Typography, Box } from "@material-ui/core";
import { perfil } from "../../lang/index";
import { swapPlan } from "../../helpers/serverRequests/subscription";
import { skipOrders } from "../../helpers/serverRequests/order";
import { getSubscriptionById } from "../../helpers/serverRequests/userProfile";
import { getDataForSwappingAPlan } from "../../helpers/serverRequests/plans";
import { useUserInfoStore } from "../../stores/auth";
import { useSnackbar } from "notistack";
import { reorderPlan } from "../../helpers/serverRequests/subscription";
import { getProfileInfo } from "../../helpers/serverRequests/userProfile";

// External Components
import Grid from "@material-ui/core/Grid";


// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import EmptyState from "components/molecules/emptyState/emptyState";
import Image from "next/image";

const Perfil = (props) => {
    const theme = useTheme();
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const router = useRouter();

    console.log("User info: ", userInfo)

    return (
        <>
            <Layout disableCallToActionSection>
               
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignContent={"center"} width={"100%"} margin={"auto"}>

                <Image unoptimized src={props.image || "/wallet-empty-state.svg"} alt="búsqueda vacía" width={150} height={150} />
                <Typography variant="h6" align="center" color="textPrimary" style={{ marginTop: theme.spacing(3) }}>
                    Monedero
                </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" style={{ marginTop: theme.spacing(1) }}>
                        Proximamente
                    </Typography>
            </Box>
            </Layout>
        </>
    );
};

export default Perfil;
