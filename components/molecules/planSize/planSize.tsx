import React from "react";
import { Grid, Typography, FormControl, FormLabel } from "@material-ui/core";
import { QuantityBox } from "@atoms";
import { PlanSizeProps, ARGS } from "./interfaces";

export const PlanSize = (props: PlanSizeProps) => {
    const _handleOnChange = (args: ARGS) => {
        props.handleOnChange(args);
    };

    return (
        <Grid item container direction="column">
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <Typography variant="body2" style={{ fontSize: "14px", fontWeight: 600 }}>
                            {props.subtitle}
                        </Typography>
                    </FormLabel>
                    <div style={{ display: "flex" }}>
                        <>
                            {props.numberItems &&
                                props.fromNumber &&
                                Array(props.numberItems)
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
                                                state={`${index + from}` === props.valueSelected}
                                            />
                                        );
                                    })}
                        </>
                        <>
                            {props.fromArray?.map((item, index) => {
                                return (
                                    <QuantityBox
                                        idForHtml={`${Math.random() * Date.now()}${item}${index}${props.name}`}
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
                                        state={`${item}` === props.valueSelected}
                                    />
                                );
                            })}
                        </>
                    </div>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default PlanSize;
