// Utils & Config
import React from "react";
import { useRouter } from "next/router";

// Internal Components
import { Layout } from "../../components/layout/index";
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import SignUpForm from "../../components/organisms/signUpForm/signUpForm";
import { verifyToken } from "../../helpers/serverRequests/customer";
import { subscribeToMailingListGroup, updateSubscriber } from "helpers/serverRequests/mailingList";
import { MAILERLITE_MAILING_LIST_GROUP } from "constants/constants";
import { IUserInfoFields } from "@stores";

const Signup = () => {
    const router = useRouter();

    const handleSignUp = (userInfo: IUserInfoFields, acceptsMarketing: boolean) => {
        router.push("/");
        subscribeToMailingListGroup(MAILERLITE_MAILING_LIST_GROUP, userInfo.email, undefined).then((res) =>
            updateSubscriber(userInfo.email, {
                shopify_accepts_marketing: acceptsMarketing ? 1 : 0,
                shopify_id: userInfo.id,
                language: router.locale === "es" ? "esp" : router.locale === "en" ? "ing" : "cat",
            })
        );
    };
    return (
        <Layout
            disableCallToActionSection
            disableFooterSection
            seoTitle="Registrarme - Let's cook: Productos frescos y recetas"
            seoOgUrlSlug="registrarme"
            page="registrarme"
        >
            <InnerSectionLayout containerMaxWidth="lg">
                <SignUpForm handleSignUp={handleSignUp} source="outside buyflow" />
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
