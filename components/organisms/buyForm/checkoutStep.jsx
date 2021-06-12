import { PropTypes } from "@material-ui/core";
import { useBuyFlow } from "../../../stores/buyflow";

export const CheckoutStep = () => {
    const gotToNextView = useBuyFlow(({ forward }) => forward);

    return (
        <>
            CheckoutStep
            <button onClick={() => gotToNextView()}>Elegir recetas</button>
        </>
    );
};

CheckoutStep.propTypes = {};

CheckoutStep.defaultProps = {};

export default CheckoutStep;
