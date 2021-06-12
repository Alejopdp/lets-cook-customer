import { PropTypes } from "@material-ui/core";
import { useBuyFlow } from "../../../stores/buyflow";

export const RegisterUserStep = () => {
    const gotToNextView = useBuyFlow(({ forward }) => forward);
    return (
        <>
            RegisterUserStep
            <button onClick={() => gotToNextView()}>Checkout</button>
        </>
    );
};

RegisterUserStep.propTypes = {};

RegisterUserStep.defaultProps = {};

export default RegisterUserStep;
