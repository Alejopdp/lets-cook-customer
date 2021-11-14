// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components
import BoxWithIconAndTextButton from "../../../components/molecules/specificBox/boxWithIconAndTextButton";


const RateRecipesActionBox = ({lang}) => {
    const theme = useTheme();

    return (
        <BoxWithIconAndTextButton icon="rating" btnText={lang.btnText}>
            <Typography variant="body2" style={{ fontSize: "16px" }}>
                {lang.text}
            </Typography>
        </BoxWithIconAndTextButton>
    );
};

export default RateRecipesActionBox;