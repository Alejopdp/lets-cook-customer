// Utils & Config
import React from "react";
import { useRouter } from "next/router";
// const langs = require("../../lang").recetas;

// Internal Components
import Layout from '../../components/layout/index';
import InnerSectionLayout from "../../components/layout/publicLayout";
import MailSignup from "../../components/organisms/mailSignup/mailSignup";
import PassSignup from "../../components/organisms/passSignup/passSignup";
import SignUpForm from "../../components/organisms/signUpForm/signUpForm"

const Signup = () => {
    const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                {/* <MailSignup />
                <PassSignup /> */}
                <SignUpForm />
            </InnerSectionLayout>
        </Layout>
    );
};

export default Signup;
