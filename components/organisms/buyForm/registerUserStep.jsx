// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useBuyFlow } from "../../../stores/buyFlow";

// Internal components
import SignUpForm from "../signUpForm/signUpForm";
import LoginBox from "../loginBox/loginBox";

export const RegisterUserStep = () => {
    const [ haveAccount, setHaveAccount] = useState(false);

    const gotToNextView = useBuyFlow(({ forward }) => forward);

    const handleRedirect = () => {
        setHaveAccount(!haveAccount);
    }

    return (
        <>
            {haveAccount
            ?
                <LoginBox
                    handleLogin={() => gotToNextView()}
                    handleRedirect={handleRedirect}
                />
            :
                <SignUpForm
                    handleCreateAccount={() => gotToNextView()}
                    handleRedirect={handleRedirect}
                />
            }

            <button onClick={() => gotToNextView()}>Checkout</button>
        </>
    );
};

RegisterUserStep.propTypes = {};

RegisterUserStep.defaultProps = {};

export default RegisterUserStep;
