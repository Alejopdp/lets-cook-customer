// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components
import BoxWithIconAndTextButton from "../../../components/molecules/specificBox/boxWithIconAndTextButton";
import { useRouter } from "next/router";

const ChooseRecipesActionBox = ({ data, lang }) => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <BoxWithIconAndTextButton handleClick={() => router.push(`/elegir-recetas/${data.orderId}`)} icon="test" btnText={lang.btnText}>
            <Typography variant="body2" style={{ fontSize: "16px" }}>
                {data.shippment}
            </Typography>
        </BoxWithIconAndTextButton>
    );
};

export default ChooseRecipesActionBox;
