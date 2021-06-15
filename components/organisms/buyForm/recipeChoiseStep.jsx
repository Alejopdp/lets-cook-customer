import { PropTypes } from "@material-ui/core";
import { useBuyFlow } from "../../../stores/buyflow";

import TitleBuyFlow from "../../molecules/titleBuyFlow/titleBuyFlow";

export const RecipeChoiseStep = () => {
    const {showRegister, setRegisterState:toggleRegister} = useBuyFlow(({ setRegisterState, showRegister }) => ({setRegisterState, showRegister}));

    return (
        <>
            <TitleBuyFlow
                title="El pago ha sido exitoso. ¡Muchas gracias por tu compra!"
                subtitle="Elige las 3 recetas que recibirás el martes 18"
            />
            <button onClick={() => toggleRegister(!showRegister)}>{showRegister ? "Ocultar Registrarse" : "Mostrar Registrarse"}</button>
        </>
    );
};

RecipeChoiseStep.propTypes = {};

RecipeChoiseStep.defaultProps = {};

export default RecipeChoiseStep;
