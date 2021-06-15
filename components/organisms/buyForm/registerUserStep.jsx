import { PropTypes } from "@material-ui/core";
import { useBuyFlow } from "../../../stores/buyflow";

import SignUpForm from "../signUpForm/signUpForm";

export const RegisterUserStep = () => {
    const gotToNextView = useBuyFlow(({ forward }) => forward);
    return (
        <>
            <SignUpForm
                handleCreateAccount={() => gotToNextView()}
            />
            <button onClick={() => gotToNextView()}>Checkout</button>
        </>
    );
};

RegisterUserStep.propTypes = {};

RegisterUserStep.defaultProps = {};

export default RegisterUserStep;
