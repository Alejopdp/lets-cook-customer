// Utils & config
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLang } from "@hooks";

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import UserInfoDetail from "../../components/organisms/userInfo";
import { useUserInfoStore } from "../../stores/auth";
import { localeRoutes, Routes } from "lang/routes/routes";
import { getCustomerById } from "helpers/serverRequests/customer";

const UserInfo = (props) => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(true);
    const [initialCustomerInfo, setinitialCustomerInfo] = useState({});
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const [lang] = useLang("configuracion");

    useEffect(() => {
        const getData = async () => {
            if (!router.isReady || !userInfo || !userInfo.id) return;
            const res = await getCustomerById(userInfo.id, router.locale);

            if (res.status === 200) {
                setinitialCustomerInfo(res.data);
            } else {
                alert("error");
            }

            setisLoading(false);
        };

        getData();
    }, [router.isReady, userInfo]);

    return (
        <Layout disableCallToActionSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url={localeRoutes[router.locale][Routes.perfil]} title={lang.title} />
                <UserInfoDetail customer={initialCustomerInfo} isLoading={isLoading} lang={lang.userInfoDetail} />
            </InnerSectionLayout>
        </Layout>
    );
};

export default UserInfo;
