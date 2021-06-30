// Utils & Config
import React from "react";

// Internal Components
import InnerSectionLayout from "../../components/layout/publicLayout";
import LoginBox from "../../components/organisms/loginBox/loginBox";
import { verifyToken } from "../../helpers/serverRequests/customer";

const Login = (props) => {
    return (
        <InnerSectionLayout containerMaxWidth="lg">
            <LoginBox redirect />
        </InnerSectionLayout>
    );
};

export default Login;

export const getInitialProps = async (context) => {
    const token = context.req.cookies.token;
    if (!!!token) {
        return { props: { isLogged: false } };
    }

    const res = await verifyToken(token);

    if (res.status === 200) {
        return { redirect: { destination: "/", permanent: true } };
    } else {
        return { props: { isLogged: false } };
    }
};
