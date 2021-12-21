// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core";
import { useSnackbar } from "notistack";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components
import BoxWithIconAndTextButton from "../../../components/molecules/specificBox/boxWithIconAndTextButton";

const ReferalActionBox = ({ data, lang }) => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        navigator.clipboard.writeText(data.couponCode);
        enqueueSnackbar("Código copiado al portapapeles", { variant: "success" });
    };
    return (
        <BoxWithIconAndTextButton
            noColor
            icon="network"
            btnText={data.couponCode}
            handleClick={handleClick}
            textBelowTextButton={lang.miniText}
        >
            <Typography variant="body2" style={{ fontSize: "16px" }}>
                {lang.text}
            </Typography>
        </BoxWithIconAndTextButton>
    );
};

export default ReferalActionBox;
