import React, { useState } from "react";
import { Grid, Typography, FormControl, FormLabel } from "@material-ui/core";
import QuantityBox from "../../atoms/quantityBox/quantityBox";

type ARGS = { name: string; value: string };

interface PlanSizeProps {
    valueSelected: string;
    name: string;
    subtitle: string;
    numberItems: number;
    fromNumber: number;
    handleOnChange: (args: ARGS) => void;
}

const PlanSize = (props: PlanSizeProps) => {
    const [value, setValue] = useState(props.valueSelected);

    const _handleOnChange = (args: ARGS) => {
        setValue(args.value);
        props.handleOnChange(args);
    };

    return (
        <Grid item container direction="column">
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <Typography variant="body1">{props.subtitle}</Typography>
                    </FormLabel>
                    <div style={{ display: "flex" }}>
                        {Array(props.numberItems)
                            .fill(props.fromNumber)
                            .map((from, index) => {
                                console.log(`${index + from}` === value, value, `${index + from}`);
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
                    </div>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default PlanSize;
