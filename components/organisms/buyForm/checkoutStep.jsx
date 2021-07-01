// Utils & Config
import PropTypes from "prop-types";
import { useBuyFlow } from "../../../stores/buyFlow";

// External components
import { Container } from "@material-ui/core";

// Internal components
import ShipmentForm from "../../molecules/shipmentForm/shipmentForm";
import PaymentForm from "../../molecules/paymentForm/paymentForm";
import IconsWithText from "../../molecules/iconsWithText/iconsWithText";

export const CheckoutStep = (props) => {
    const gotToNextView = useBuyFlow(({ forward }) => forward);

    return (
        <Container maxWidth="lg">
            <button onClick={() => gotToNextView()}>Elegir recetas</button>
            <ShipmentForm registeredUser />
            <PaymentForm savedCards handleSubmitPayment={props.handleSubmitPayment} />
            <IconsWithText />
        </Container>
    );
};

CheckoutStep.propTypes = {};

CheckoutStep.defaultProps = {};

export default CheckoutStep;
