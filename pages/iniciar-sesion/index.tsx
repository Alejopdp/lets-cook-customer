// Utils & Config
import React from "react";

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import LoginBox from "../../components/organisms/loginBox/loginBox";
import { verifyToken } from "../../helpers/serverRequests/customer";
import { Layout } from "../../components/layout/index";

const Login = (props) => {
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
