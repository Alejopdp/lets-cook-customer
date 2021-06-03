// Utils & Config
import React from "react";
import { useRouter } from "next/router";
// const langs = require("../../lang").recetas;

// External components

// Internal Components
import InnerSectionLayout from "../../components/layout/publicLayout";
import LoginBox from "../../components/molecules/loginBox/loginBox";

const Login = () => {
    const router = useRouter();
    // const lang = langs[router.locale];

    return (
            <InnerSectionLayout containerMaxWidth="lg">
                <LoginBox />
            </InnerSectionLayout>
    );
};

export default Login;
