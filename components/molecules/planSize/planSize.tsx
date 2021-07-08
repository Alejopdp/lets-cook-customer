import React, { useState, memo, useEffect } from "react";
import { Grid, Typography, FormControl, FormLabel } from "@material-ui/core";
import { QuantityBox } from "@atoms";
import { PlanSizeProps, ARGS } from "./interfaces";

export const PlanSize = (props: PlanSizeProps) => {
    const [value, setValue] = useState('');

    const _handleOnChange = (args: ARGS) => {
        setValue(args.value);
        props.handleOnChange(args);
    };

    useEffect(() => {
        setValue(props.valueSelected)
    },[])

    return (
        <Grid item container direction="column">
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <Typography variant="body1">{props.subtitle}</Typography>
                    </FormLabel>
                    <div style={{ display: "flex" }}>
                        {props.numberItems && props.fromNumber && Array(props.numberItems)
                            .fill(props.fromNumber)
                            .map((from, index) => {
                                return (
                                    <QuantityBox
                                        name={props.name}
                                        onChange={(_value) => {
                                            _handleOnChange({
                                                name: props.name,
                                                value: _value,
                                            });
                                        }}
                                        key={index}
                                        label={`${index + from}`}
                                        value={`${index + from}`}
                                        state={`${index + from}` === value}
                                    />
                                );
                            })}
                        {props.fromArray?.map((item, index) => {
                            console.log(`***-> item: ${item} === ${value}`)
                            return (
                                <QuantityBox
                                    name={props.name}
                                    onChange={(_value) => {
                                        _handleOnChange({
                                            name: props.name,
                                            value: _value,
                                        });
                                    }}
                                    key={index}
                                    label={`${item}`}
                                    value={`${item}`}
                                    state={`${item}` === value}
                                />
                            );
                        })}
                    </div>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default PlanSize;
