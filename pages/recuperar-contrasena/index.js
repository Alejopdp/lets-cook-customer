// Utils & Config
import React from "react";
import { useRouter } from "next/router";
// const langs = require("../../lang").recetas;

// Internal Components
import Layout from '../../components/layout/index';
import InnerSectionLayout from "../../components/layout/publicLayout";
import RecoverPasswordCode from "../../components/organisms/recoverPassword/recoverPasswordCode";
import RecoverPasswordMail from "../../components/organisms/recoverPassword/recoverPasswordMail";
import RecoverPassword from "../../components/organisms/recoverPassword/recoverPassword";

const Signup = () => {
    const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <RecoverPasswordMail />
                <RecoverPasswordCode />
                <RecoverPassword />
            </InnerSectionLayout>
        </Layout>
    );
};

export default Signup;
