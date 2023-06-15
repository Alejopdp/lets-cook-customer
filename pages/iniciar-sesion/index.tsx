// Utils & Config
import React, { useEffect, useState } from "react";

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import LoginBox from "../../components/organisms/loginBox/loginBox";
import {  verifyToken } from "../../helpers/serverRequests/customer";
import { Layout } from "../../components/layout/index";
import { useRouter } from "next/router";
import { Routes, localeRoutes } from "lang/routes/routes";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "@hooks";
import { useAuthStore, useUserInfoStore } from "@stores";
import cookies from "js-cookie";
import { Box, CircularProgress } from "@material-ui/core";
import { useAuth } from "contexts/auth.context";

const Login = (props) => {
    // const [isCheckingRedirect, setIsCheckingRedirect] = useState(true)
    const {  saveInLocalStorage } = useLocalStorage();
    const {  setuserInfo } = useUserInfoStore();
    const {push, locale} = useRouter()
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const {handleLoginRedirect, isCheckingRedirect} = useAuth()

    useEffect(() => {
        
        handleLoginRedirect(localeRoutes[locale][Routes.perfil])
    }, []);
    return (
        <Layout
            seoTitle="Ingresar - Let's cook: Productos frescos y recetas"
            seoOgUrlSlug="ingresar"
            disableCallToActionSection
            disableFooterSection
            page="ingresar"
        >
            <InnerSectionLayout containerMaxWidth="lg">
                {isCheckingRedirect && <Box position={"fixed"} top={"50%"} left={"50%"}><CircularProgress /></Box>}
                {!isCheckingRedirect && <LoginBox redirect source="outside buyflow" />}
            </InnerSectionLayout>
        </Layout>
    );
};

export default Login;

export const getInitialProps = async (context) => {
    const token = context.req.cookies.token;
    if (!!!token) {
        return { props: { isLogged: false } };
    }

    const res = await verifyToken(token);

    if (res.status === 200) {
        return { redirect: { destination: "/", permanent: false } };
    } else {
        return { props: { isLogged: false } };
    }
};
