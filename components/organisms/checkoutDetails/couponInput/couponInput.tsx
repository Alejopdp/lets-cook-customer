// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

// External components
import Fab from "@material-ui/core/Fab";
import ChevronRight from "@material-ui/icons/ChevronRight";

// Internal components
import { TextInput } from "../../../atoms/inputs/index";
import { CouponInputProps } from "./interface";

const CouponInput = (props: CouponInputProps) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <TextInput onChange={props.onChange} label="Cupón de descuento" name={props.name} value={props.value} />
            <Fab color="primary" style={{ marginLeft: 8, width: '40px', height: '40px' }} onClick={props.handleSubmit}>
                <ChevronRight />
            </Fab>
        </Box>
    );
};

CouponInput.propTypes = {};

export default CouponInput;
