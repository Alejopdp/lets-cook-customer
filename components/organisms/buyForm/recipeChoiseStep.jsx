import { PropTypes } from "@material-ui/core";
import { useBuyFlow } from "../../../stores/buyflow";

export const RecipeChoiseStep = () => {
    const {showRegister, setRegisterState:toggleRegister} = useBuyFlow(({ setRegisterState, showRegister }) => ({setRegisterState, showRegister}));

    return (
        <>
            RecipeChoiseStep
            <button onClick={() => toggleRegister(!showRegister)}>{showRegister ? "Ocultar Registrarse" : "Mostrar Registrarse"}</button>
        </>
    );
};

RecipeChoiseStep.propTypes = {};

RecipeChoiseStep.defaultProps = {};

export default RecipeChoiseStep;
