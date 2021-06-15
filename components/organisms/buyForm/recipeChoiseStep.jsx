// Utils & Config
import PropTypes from "prop-types";
import { useBuyFlow } from "../../../stores/buyflow";

// External components
import { Container } from "@material-ui/core";

// Internal components
import RecipesGrid from "../../organisms/recipesGrid/recipesGrid";
import TitleBuyFlow from "../../molecules/titleBuyFlow/titleBuyFlow";

export const RecipeChoiseStep = (props) => {
    const {showRegister, setRegisterState:toggleRegister} = useBuyFlow(({ setRegisterState, showRegister }) => ({setRegisterState, showRegister}));

    return (
        <Container maxWidth="lg">
            <TitleBuyFlow
                title="El pago ha sido exitoso. ¡Muchas gracias por tu compra!"
                subtitle="Elige las 3 recetas que recibirás el martes 18"
            />

            <RecipesGrid recipesSelection recipes={props.recipes} />

            <button onClick={() => toggleRegister(!showRegister)}>{showRegister ? "Ocultar Registrarse" : "Mostrar Registrarse"}</button>
        </Container>
    );
};

RecipeChoiseStep.propTypes = {};

RecipeChoiseStep.defaultProps = {};

export default RecipeChoiseStep;
