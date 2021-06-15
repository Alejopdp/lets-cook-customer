// Utils & Config
import PropTypes from "prop-types";
import { useBuyFlow } from "../../../stores/buyflow";

// Internal components
import SignUpForm from "../signUpForm/signUpForm";

export const RegisterUserStep = () => {
    const gotToNextView = useBuyFlow(({ forward }) => forward);

    const handleRedirect = () => {
        alert("Cambiar componente a Login")
    }
    return (
        <>
            <SignUpForm
                handleCreateAccount={() => gotToNextView()}
                handleRedirect={handleRedirect}
            />
            <button onClick={() => gotToNextView()}>Checkout</button>
        </>
    );
};

RegisterUserStep.propTypes = {};

RegisterUserStep.defaultProps = {};

export default RegisterUserStep;
