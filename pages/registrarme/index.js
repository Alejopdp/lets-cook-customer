// Utils & Config
import React from "react";

// Internal Components
import Layout from '../../components/layout/index';
import InnerSectionLayout from "../../components/layout/publicLayout";
import SignUpForm from "../../components/organisms/signUpForm/signUpForm"

const Signup = () => {
    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <SignUpForm />
            </InnerSectionLayout>
        </Layout>
    );
};

export default Signup;
