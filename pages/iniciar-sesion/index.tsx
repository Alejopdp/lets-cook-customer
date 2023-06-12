// Utils & Config
import React, { useEffect, useState } from "react";

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import LoginBox from "../../components/organisms/loginBox/loginBox";
import { loginWithSocialMedia, verifyToken } from "../../helpers/serverRequests/customer";
import { Layout } from "../../components/layout/index";
import { getAuth, getRedirectResult } from "firebase/auth";
import { useRouter } from "next/router";
import { Routes, localeRoutes } from "lang/routes/routes";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "@hooks";
import { useAuthStore, useUserInfoStore } from "@stores";
import cookies from "js-cookie";
import { Box, CircularProgress } from "@material-ui/core";

const Login = (props) => {
    const [isCheckingRedirect, setIsCheckingRedirect] = useState(true)
    const {  saveInLocalStorage } = useLocalStorage();
    const {  setuserInfo } = useUserInfoStore();
    const {push, locale} = useRouter()
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

    const saveLoginData = (token, userInfo) => {
        saveInLocalStorage(LOCAL_STORAGE_KEYS.token, token);
        saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, userInfo);
        setuserInfo(userInfo);
        cookies.set(LOCAL_STORAGE_KEYS.token, token);
        setIsAuthenticated(true);
        push(localeRoutes[locale][Routes.perfil])
    };


    const handleSocialMediaSubmit = async (token, email = "") => {
        const res = await loginWithSocialMedia(token, email, false);

        if (res.status === 200) {
            saveLoginData(res.data.token, res.data.userInfo);
        } else {
            // setserverError(res.data.message);
            setIsCheckingRedirect(false)
        }
    };


    useEffect(() => {
        const handleLoginRedirect = async () => {

            const result = await getRedirectResult(getAuth())
            if (result?.user) {
                const { user } = result;
                const accessToken = await user.getIdToken()
                
                console.log("Access token: ", accessToken)
                handleSocialMediaSubmit(accessToken, user.email)        
            } else {
                setIsCheckingRedirect(false)
            }
        }
        handleLoginRedirect()
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
