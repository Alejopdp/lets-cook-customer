// Utils & Config
import React from "react";
import { useRouter } from "next/router";
// const langs = require("../../lang").recetas;

// Internal Components
import Layout from '../../components/layout/index';
import InnerSectionLayout from "../../components/layout/publicLayout";
import RecoverPasswordForm from "../../components/organisms/recoverPassword/recoverPasswordForm";

const Signup = () => {
    const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <RecoverPasswordForm />
            </InnerSectionLayout>
        </Layout>
    );
};

export default Signup;
