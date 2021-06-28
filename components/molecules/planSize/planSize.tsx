import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, RadioGroup, FormControl, FormLabel } from "@material-ui/core";
import QuantityBox from "../../atoms/quantityBox/quantityBox";

const PlanSize = ({ name, subtitle, numberItems = 1, fromNumber = 0, handleOnChange = (p) => {} }) => {
    const [value, setValue] = useState();
    const _handleOnChange = ({ name, value }) => {
        setValue(value);
        handleOnChange({ name, value });
    };
    return (
        <Grid item container direction="column">
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <Typography variant="body1">{subtitle}</Typography>
                    </FormLabel>
                    <div style={{display: "flex"}}>
                    {Array(numberItems)
                        .fill(fromNumber)
                        .map((from, index) => (
                            <QuantityBox
                                name={name}
                                onChange={ value => _handleOnChange({name, value})}
                                key={index}
                                label={`${index + from}`}
                                value={`${index + from}`}
                                state={`${index + from}` === value}
                            />
                        ))}
                    </div>
                </FormControl>
            </Grid>
        </Grid>
    );
};

PlanSize.propTypes = {
    name: PropTypes.string,
    subtitle: PropTypes.string.isRequired,
    numberItems: PropTypes.number,
    fromNumber: PropTypes.number,
    handleOnChange: PropTypes.func,
};

PlanSize.defaultProps = {
    numberItems: 0,
    fromNumber: 0,
    handleOnChange: (p) => {},
};
export default PlanSize;
