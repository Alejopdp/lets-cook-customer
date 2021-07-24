// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components
import BoxWithIconAndTextButton from "../../../components/molecules/specificBox/boxWithIconAndTextButton";


const ChooseRecipesActionBox = ({ data }) => {
    const theme = useTheme();

    return (
        <BoxWithIconAndTextButton icon="test" btnText="Elegir recetas">
            <Typography variant="body2" style={{ fontSize: "16px" }}>
                {data.shippment}
            </Typography>
        </BoxWithIconAndTextButton>
    );
};

export default ChooseRecipesActionBox;