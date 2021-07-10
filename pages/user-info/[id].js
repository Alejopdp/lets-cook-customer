import React from "react";

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import UserInfoDetail from "../../components/organisms/userInfo";
import { getUserInfo } from "../../helpers/serverRequests/user-info";

export async function getStaticPaths() {
    return {
        paths: [{ params: { id: "1" } }],
        fallback: false,
    };
}

export const getStaticProps = async (context) => {
    const test = context.params.id;
    const res = await getUserInfo(test, context.locale);
    return {
        props: {},
    };
};

const UserInfo = () => {
    return (
        <Layout disableCallToActionSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/" title="Configuracion de la cuenta" />
                <UserInfoDetail />
            </InnerSectionLayout>
        </Layout>
    );
};

export default UserInfo;
