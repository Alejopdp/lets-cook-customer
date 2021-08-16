// Utils & config
import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
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

// Internal components

const SelectVariantContent = (props: SelectVariantContentProps) => {
    const theme = useTheme();
    const router = useRouter();
    const classes = useStylesVariantContent();
    const [selectedAttributes, setselectedAttributes] = useState<{ [key: string]: string }>({});
    const [selectedFrequency, setselectedFrequency] = useState("");

    useEffect(() => {
        setNewVariant();
    }, [selectedAttributes, props.selectedFrequency]);

    const attributesKeyAndValues = useMemo(() => {
        const map = {};

        for (let variant of props.variants) {
            for (let attr of variant.attributes) {
                const mapKey = map[attr[0]];
                map[attr[0]] = Array.isArray(mapKey) ? [...mapKey, attr[1]] : [attr[1]];
            }

            if (variant.numberOfPersons) {
                const key = "Personas";
                map[key] = Array.isArray(key) ? [...map[key], variant.numberOfPersons] : [variant.numberOfPersons];
            }

            if (variant.numberOfRecipes) {
                const key = "Recetas";
                map[key] = Array.isArray(key) ? [...map[key], variant.numberOfRecipes] : [variant.numberOfRecipes];
            }
        }

        return Object.entries(map);
    }, []);

    // const actualValue = useMemo(() => {
    //     const attributesEntries = Object.entries(selectedAttributes);
    //     if (attributesEntries.length > 0) {
    //         const variant = getPlanVariantWithAttributes(selectedAttributes, props.variants);

    //         if (!!variant) {
    //             const withoutOldVariant = props.selectedVariants.filter((va) => va.planId !== variant.planId);
    //             props.setselectedVariants([...withoutOldVariant, { ...variant, frequency: selectedFrequency }]);
    //             return variant.price;
    //         }

    //         return variant ? variant.price : -1;
    //     } else {
    //         return props.variants.reduce((acc, variant) => (variant.price < acc || acc === 0 ? variant.price : acc), 0);
    //     }
    // }, [selectedAttributes, props.selectedVariants]);

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
            <Box>
                {attributesKeyAndValues.map((entry: any, index: number) => (
                    <AttributePicker
                        handleAttributeClick={handleAttributeClick}
                        selectedAttributes={selectedAttributes}
                        key={index}
                        title={entry[0]}
                        values={entry[1]}
                    />
                ))}
            </Box>

            <Typography color="primary" style={{ fontSize: 18, fontWeight: "bold", marginBottom: theme.spacing(3) }}>
                {actualValue === -1 ? "" : `Valor: € ${actualValue}`}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "14px", fontWeight: 600, marginBottom: theme.spacing(1) }}>
                Frecuencia:
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
        </Box>
    );
};

SelectVariantContent.propTypes = {};

export default SelectVariantContent;
