// Utils & config
import React from "react";
import { Box } from "@material-ui/core";

// External components
import Fab from "@material-ui/core/Fab";
import ChevronRight from "@material-ui/icons/ChevronRight";

// Internal components
import { TextInput } from "../../../atoms/inputs/index";
import { CouponInputProps } from "./interface";
import { useLang } from "@hooks";

const CouponInput = (props: CouponInputProps) => {
    const [lang] = useLang("checkoutStep");

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <TextInput
                onChange={props.onChange}
                label={lang.checkoutDetails.couponInputLabel}
                name={props.name}
                value={props.value}
                handleSubmit={props.handleSubmit}
            />
            <Fab color="primary" style={{ marginLeft: 8, width: "40px", height: "40px" }} onClick={props.handleSubmit}>
                <ChevronRight />
            </Fab>
        </Box>
    );
};

export default CouponInput;
