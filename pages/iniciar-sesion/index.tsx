// Utils & Config
import React, { useEffect } from "react";

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import LoginBox from "../../components/organisms/loginBox/loginBox";
import { verifyToken } from "../../helpers/serverRequests/customer";
import { Layout } from "../../components/layout/index";
import { getAuth, getRedirectResult } from "firebase/auth";

const Login = (props) => {

    useEffect(() => {
        const handleLoginRedirect = async () => {

            const result = await getRedirectResult(getAuth())
            if (result?.user) {
                const { user } = result;
                const accessToken = await user.getIdToken()
                
                console.log("Access token: ", accessToken)
            }
            console.log("A ver el resulted user: ", result?.user)
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
                <LoginBox redirect source="outside buyflow" />
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
