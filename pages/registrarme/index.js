// Utils & Config
import React from "react";
import { useRouter } from "next/router";

// Internal Components
import { Layout } from "../../components/layout/index";
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import SignUpForm from "../../components/organisms/signUpForm/signUpForm";
import { verifyToken } from "../../helpers/serverRequests/customer";

const Signup = () => {
    const router = useRouter();

    const handleSignUp = () => {
        router.push("/");
    };
    return (
        <Layout disableCallToActionSection disableFooterSection seoTitle="Registrarme - Let's cook: Productos frescos y recetas" seoOgUrlSlug='registrarme'>
            <InnerSectionLayout containerMaxWidth="lg">
                <SignUpForm handleSignUp={handleSignUp} />
            </InnerSectionLayout>
        </Layout>
    );
};

export default Signup;

export const getInitialProps = async (context) => {
    const token = context.req.cookies.token;
    if (!!!token) {
        return { props: { isLogged: false } };
    }

    const res = await verifyToken(token);

    if (res.status === 200) {
        return { redirect: { destination: "/", permanent: true } };
    } else {
        return { props: { isLogged: false } };
    }
};
