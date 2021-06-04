// Utils & Config
import React from "react";
import { useRouter } from "next/router";
// const langs = require("../../lang").recetas;

// External components

// Internal Components
import Layout from '../../components/layout/index';
import InnerSectionLayout from "../../components/layout/publicLayout";
import MailSignup from "../../components/organisms/mailSignup/mailSignup";
import PassSignup from "../../components/organisms/passSignup/passSignup";

const Signup = () => {
    const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <MailSignup />
                <PassSignup />
            </InnerSectionLayout>
        </Layout>
    );
};

export default Signup;
