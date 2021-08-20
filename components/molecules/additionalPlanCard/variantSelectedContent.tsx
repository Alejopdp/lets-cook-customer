import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@material-ui/core";
import { VariantSelectedContentProps } from "./interface";
import { translateFrequency } from "helpers/utils/i18n";

// Icons & Images
import RotateRight from "@material-ui/icons/RotateRight";
import { useRouter } from "next/router";

const VariantSelectedContent = (props: VariantSelectedContentProps) => {
    const theme = useTheme();
    const router = useRouter();
    return (
        <Box>
            <Typography variant="subtitle1" color="initial" style={{ marginBottom: 8 }}>
                {props.additionalPlanName}
            </Typography>
            {props.variant && (
                <>
                    <Box marginBottom={3}>
                        {props.variant.attributes.map((attr, index) => (
                            <>
                                <Typography variant="body2" style={{ fontSize: "14px", fontWeight: 600, marginBottom: theme.spacing(1) }}>
                                    {attr[0]}
                                </Typography>
                                <Typography key={index} variant="body2">
                                    {attr[1]}
                                </Typography>
                            </>
                        ))}
                    </Box>
                    <Typography color="primary" style={{ fontSize: 18, fontWeight: "bold", marginBottom: theme.spacing(3) }}>
                        Valor: {props.variant.priceWithOffer || props.variant.price} €
                    </Typography>
                </>
            )}
            <Box display="flex" alignItems="center">
                <RotateRight style={{ marginRight: 8 }} />{" "}
                <Typography variant="body2" style={{ fontSize: "16px" }}>
                    Plan {translateFrequency(props.selectedFrequency, router.locale)}
                </Typography>
            </Box>
        </Box>
    );
};

VariantSelectedContent.propTypes = {};

export default VariantSelectedContent;
