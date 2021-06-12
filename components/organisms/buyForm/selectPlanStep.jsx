import { PropTypes } from "@material-ui/core";
import { useBuyFlow } from "../../../stores/buyflow";

export const SelectPlanStep = () => {
    const gotToNextView = useBuyFlow(({ forward }) => forward);

    return (
        <>
            SelectPlanStep
            <button onClick={() => gotToNextView()}>Registrarse</button>
        </>
    );
};

SelectPlanStep.propTypes = {};

SelectPlanStep.defaultProps = {};

export default SelectPlanStep;
