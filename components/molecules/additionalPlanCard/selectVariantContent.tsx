// Utils & config
import React, { useState, useEffect } from "react";
import { useStylesVariantContent } from "./styles";
import { useTheme } from "@material-ui/core";

// External components
import Box from "@material-ui/core/Box";
import { SelectVariantContentProps } from "./interface";
import AttributePicker from "./attributePicker";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import { getPlanVariantWithAttributes } from "@helpers";
import { PlanVariant } from "types/planVariant";
import { translateFrequency } from "helpers/utils/i18n";
import { useRouter } from "next/router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Internal components

const SelectVariantContent = (props: SelectVariantContentProps) => {
    const lang = props.lang;
    const theme = useTheme();
    const router = useRouter();
    const classes = useStylesVariantContent();
    const [selectedAttributes, setselectedAttributes] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setNewVariant();
    }, [selectedAttributes, props.selectedFrequency]);

    const setNewVariant = () => {
        const attributesEntries = Object.entries(selectedAttributes);
        if (attributesEntries.length > 0) {
            const variant = getPlanVariantWithAttributes(selectedAttributes, props.variants);

            if (!!variant) {
                const withoutOldVariant = props.selectedVariants.filter((va) => va.planId !== variant.planId);
                props.setselectedVariants([...withoutOldVariant, { ...variant, frequency: props.selectedFrequency }]);
                return variant.priceWithOffer || variant.price;
            }
        }
    };

    const getPlanVariantPrice = (variant: PlanVariant | undefined) => {
        return variant ? variant.priceWithOffer || variant.price : -1;
    };

    const handleAttributeClick = (attrName: string, attrValue: string) => {
        setselectedAttributes({ ...selectedAttributes, [attrName]: attrValue });
    };

    const actualValue = getPlanVariantPrice(props.selectedVariants.find((v) => v.planId === props.planId));

    return (
        <Box>
            <Box
                style={{ cursor: "pointer", display: "flex", alignItems: "center", marginBottom: theme.spacing(2) }}
                onClick={props.handleClickBackToFirstContent}
            >
                <ArrowBackIcon style={{ marginRight: theme.spacing(1), color: "#515151" }} />
                <Typography variant="h5" color="initial">
                    {props.additionalPlanName}
                </Typography>
            </Box>
            <Box>
                {props.attributesKeysAndValues.map((entry: any, index: number) => (
                    <AttributePicker
                        handleAttributeClick={handleAttributeClick}
                        selectedAttributes={selectedAttributes}
                        key={index}
                        title={entry[0]}
                        values={entry[1]}
                    />
                ))}
            </Box>
            <Typography variant="body2" style={{ fontSize: "14px", fontWeight: 600, marginBottom: theme.spacing(1) }}>
                {lang.frequencyText}
            </Typography>
            <FormControl component="fieldset" style={{ width: "100%" }}>
                <RadioGroup
                    aria-label="frequency"
                    name="frequency"
                    value={props.selectedFrequency}
                    onChange={(e, value) => props.setselectedFrequency(value)}
                >
                    {props.frequencies &&
                        props.frequencies.map((freq) => (
                            <FormControlLabel
                                className={classes.formControlRadio}
                                checked={freq === props.selectedFrequency}
                                value={freq}
                                control={<Radio size="small" checked={freq === props.selectedFrequency} />}
                                label={translateFrequency(freq, router.locale)}
                            />
                        ))}
                </RadioGroup>
            </FormControl>
            {actualValue !== -1 && (
                <div style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                    <Typography color="primary" style={{ fontSize: 18, fontWeight: "bold" }}>
                        {`${lang.priceText}: ${actualValue}€`}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {lang.taxIncluded}
                    </Typography>
                </div>
            )}
        </Box>
    );
};

export default SelectVariantContent;
