// Utils & config
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import UserInfoDetail from "../../components/organisms/userInfo";
import { getUserInfo } from "../../helpers/serverRequests/user-info";
import { useUserInfoStore } from "../../stores/auth";

const UserInfo = (props) => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(true);
    const [initialCustomerInfo, setinitialCustomerInfo] = useState({});
    const userInfo = useUserInfoStore((state) => state.userInfo);
    // const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getData = async () => {
            if (!router.isReady) return;
            const res = await getUserInfo(userInfo.id, router.locale);

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

    return (
        <Layout disableCallToActionSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/perfil" title="Configuracion de la cuenta" />
                <UserInfoDetail customer={initialCustomerInfo} isLoading={isLoading} />
            </InnerSectionLayout>
        </Layout>
    );
};

export default UserInfo;
