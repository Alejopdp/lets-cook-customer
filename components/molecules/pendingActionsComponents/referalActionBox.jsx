// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components
import BoxWithIconAndTextButton from "../../../components/molecules/specificBox/boxWithIconAndTextButton";


const ReferalActionBox = ({ data, lang }) => {
    const theme = useTheme();

    return (
        <BoxWithIconAndTextButton noColor icon="network" btnText={data.couponCode}>
            <Typography variant="body2" style={{ fontSize: "16px" }}>
                {lang.text} {data.discountValue}
            </Typography>
        </BoxWithIconAndTextButton>
    );
};

export default ReferalActionBox;