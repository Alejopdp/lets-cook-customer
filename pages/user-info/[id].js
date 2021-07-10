<<<<<<< HEAD
// Utils & config
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

// Internal Components
import InnerSectionLayout from "../../components/layout/publicLayout";
import Layout from "../../components/layout/index";
=======
import React from "react";

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
>>>>>>> integrationSprint5
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import UserInfoDetail from "../../components/organisms/userInfo";
import { getUserInfo } from "../../helpers/serverRequests/user-info";

<<<<<<< HEAD
const UserInfo = (props) => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(true);
    const [initialCustomerInfo, setinitialCustomerInfo] = useState({});
    // const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getData = async () => {
            if (!router.isReady) return;
            const res = await getUserInfo(router.query.id, router.locale);

            if (res.status === 200) {
                setinitialCustomerInfo(res.data);
            } else {
                // enqueueSnackbar("Error al buscar la información", { variant: "error" });
                alert("error");
            }

            setisLoading(false);
        };

        getData();
    }, [router.isReady]);
=======
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
>>>>>>> integrationSprint5

    return (
        <Layout disableCallToActionSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/" title="Configuracion de la cuenta" />
<<<<<<< HEAD
                <UserInfoDetail customer={initialCustomerInfo} isLoading={isLoading} />
=======
                <UserInfoDetail />
>>>>>>> integrationSprint5
            </InnerSectionLayout>
        </Layout>
    );
};

export default UserInfo;
