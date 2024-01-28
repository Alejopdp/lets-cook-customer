import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import { VariantSelectedContentProps } from "./interface";
import { translateFrequency } from "helpers/utils/i18n";

// Icons & Images
import RotateRight from "@material-ui/icons/RotateRight";
import { useRouter } from "next/router";

const VariantSelectedContent = (props: VariantSelectedContentProps) => {
    const lang = props.lang;
    const theme = useTheme();
    const router = useRouter();
    return (
        <Box style={{ color: theme.palette.primary.main }}>
            <Typography variant="h5" color="textPrimary" style={{ marginBottom: theme.spacing(2) }}>
                {props.additionalPlanName}
            </Typography>
            {props.variant && (
                <>
                    <Box marginBottom={3}>
                        {props.variant.attributes.map((attr, index) => (
                            <>
                                <Typography
                                    color="textPrimary"
                                    variant="body2"
                                    style={{ fontSize: "14px", fontWeight: 600, marginBottom: theme.spacing(1) }}
                                >
                                    {attr[0]}
                                </Typography>
                                <Typography color="textPrimary" key={index} variant="body2">
                                    {attr[1]}
                                </Typography>
                            </>
                        ))}
                    </Box>
                    {props.variant.numberOfPersons && (
                        <Box marginBottom={3}>
                            <>
                                <Typography
                                    color="textPrimary"
                                    variant="body2"
                                    style={{ fontSize: "14px", fontWeight: 600, marginBottom: theme.spacing(1) }}
                                >
                                    {lang.planSizeText}
                                </Typography>
                                <Typography color="textPrimary" variant="body2">
                                    {props.variant.numberOfPersons} personas / {props.variant.numberOfRecipes} recetas
                                </Typography>
                            </>
                        </Box>
                    )}
                </>
            )}
            <Box display="flex" alignItems="center">
                <RotateRight style={{ marginRight: 8 }} />
                <Typography color="textPrimary" variant="body2" style={{ fontSize: "16px" }}>
                    {lang.frequencyText} {translateFrequency(props.selectedFrequency, router.locale).toLowerCase()}
                </Typography>
            </Box>
            <div style={{ marginTop: theme.spacing(3) }}>
                <Typography color="primary" style={{ fontSize: 18, fontWeight: "bold" }}>
                    {lang.priceText}: {props.variant.priceWithOffer || props.variant.price}€
                </Typography>
                <Typography variant="caption" color="textPrimary">
                    {lang.taxIncluded}
                </Typography>
            </div>
        </Box>
    );
};

export default VariantSelectedContent;
