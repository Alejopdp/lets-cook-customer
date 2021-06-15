// Utils & Config
import PropTypes from "prop-types";
import { useBuyFlow } from "../../../stores/buyflow";

// External components
import { Container } from "@material-ui/core";

// Internal components
import ShipmentForm from '../../molecules/shipmentForm/shipmentForm';
import PaymentForm from '../../molecules/paymentForm/paymentForm';
import IconsWithText from '../../molecules/iconsWithText/iconsWithText';

export const CheckoutStep = () => {
    const gotToNextView = useBuyFlow(({ forward }) => forward);

    return (
        <Container maxWidth="lg">
            <ShipmentForm registeredUser />
            <PaymentForm savedCards />
            <IconsWithText />

            <button onClick={() => gotToNextView()}>Elegir recetas</button>
        </Container>
    );
};

CheckoutStep.propTypes = {};

CheckoutStep.defaultProps = {};

export default CheckoutStep;
