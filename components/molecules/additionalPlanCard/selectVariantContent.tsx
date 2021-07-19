// Utils & config
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";
import { SelectVariantContentProps } from "./interface";
import AttributePicker from "./attributePicker";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";

// Internal components

const SelectVariantContent = (props: SelectVariantContentProps) => {
    const [selectedAttributes, setselectedAttributes] = useState<{ [key: string]: string }>({});
    const [selectedFrequency, setselectedFrequency] = useState("");

    const attributesKeyAndValues = useMemo(() => {
        const map = {};

        for (let variant of props.variants) {
            for (let attr of variant.attributes) {
                const mapKey = map[attr[0]];
                map[attr[0]] = Array.isArray(mapKey) ? [...mapKey, attr[1]] : [attr[1]];
            }
        }

        return Object.entries(map);
    }, []);

    const actualValue = useMemo(() => {
        const attributesEntries = Object.entries(selectedAttributes);
        if (attributesEntries.length > 0) {
            const variant = props.variants.find((variant) =>
                variant.attributes.every((attr) => attributesEntries.some((entry) => entry[1] === attr[1]))
            );

            if (!!variant) {
                props.setselectedVariant(variant);
                return variant.price;
            }

            return variant ? variant.price : -1;
        } else {
            return props.variants.reduce((acc, variant) => (variant.price < acc || acc === 0 ? variant.price : acc), 0);
        }
    }, [selectedAttributes]);

    const handleAttributeClick = (attrName: string, attrValue: string) => {
        setselectedAttributes({ [attrName]: attrValue });
    };

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

            <Typography color="primary" style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>
                Valor: {actualValue} E
            </Typography>
            <FormControl component="fieldset" style={{ width: "100%" }}>
                <RadioGroup
                    aria-label="frequency"
                    name="frequency"
                    value={props.selectedFrequency}
                    onChange={(e, value) => props.setselectedFrequency(value)}
                >
                    {props.frequencies ? (
                        props.frequencies.map((freq) => (
                            <FormControlLabel
                                checked={freq === props.selectedFrequency}
                                value={freq}
                                control={<Radio checked={freq === props.selectedFrequency} />}
                                label={freq}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

SelectVariantContent.propTypes = {};

export default SelectVariantContent;
