// Utils & Config
import React from "react";

// Internal Components
import Layout from '../../components/layout/index';
import InnerSectionLayout from "../../components/layout/publicLayout";
import RecoverPasswordForm from "../../components/organisms/recoverPassword/recoverPasswordForm";

const Signup = () => {
    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <RecoverPasswordForm />
            </InnerSectionLayout>
        </Layout>
    );
};

export default Signup;
