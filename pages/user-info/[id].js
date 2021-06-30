import React from 'react'

// Internal Components
import InnerSectionLayout from "../../components/layout/publicLayout";
import Layout from '../../components/layout/index';
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import UserInfoDetail from "../../components/organisms/userInfo"


const UserInfo = () => {
    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/" title="Configuracion de la cuenta"/>
                <UserInfoDetail/>
            </InnerSectionLayout>
        </Layout>
    )
}

export default UserInfo
