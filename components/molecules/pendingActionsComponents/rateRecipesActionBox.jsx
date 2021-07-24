// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components
import BoxWithIconAndTextButton from "../../../components/molecules/specificBox/boxWithIconAndTextButton";


const RateRecipesActionBox = props => {
    const theme = useTheme();

    return (
        <BoxWithIconAndTextButton icon="rating" btnText="Valorar recetas">
            <Typography variant="body2" style={{ fontSize: "16px" }}>
                Tienes recetas pendientes de valorar. ¡Tu opinión nos ayuda a mejorar!
            </Typography>
        </BoxWithIconAndTextButton>
    );
};

export default RateRecipesActionBox;