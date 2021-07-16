// Utils & Config
import React from "react";

// Internal Components
import { Layout } from "../../components/layout/index";
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import RecoverPasswordForm from "../../components/organisms/recoverPassword/recoverPasswordForm";

const Signup = () => {
    return (
        <Layout disableCallToActionSection disableFooterSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <RecoverPasswordForm />
            </InnerSectionLayout>
        </Layout>
    );
};

export default Signup;
