// Utils & Config
import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

// Internal Components

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
        "& .MuiFormControl-root": {
            width: "100%",
        },
    },
}));

const SpecialDiet = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <Typography variant="body2" color="textSecondary" style={{ fontSize: "16px", marginBottom: theme.spacing(3) }}>
                Si tienes alguna intolerancia (como gluten o lactosa) o dieta especial (como vegano), lo puedes comunicar y nosotros
                enviaremos ingredientes que se adapten a tus requerimientos
            </Typography>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(3) }}>
                <InputLabel htmlFor="outlined-age-native-simple">Indique su dieta</InputLabel>
                <Select
                    native
                    value={props.valueSelect}
                    onChange={props.handleChangeSelect}
                    label="Indique su dieta"
                    inputProps={{ name: "id", id: "specialDiet" }}
                >
                    <option key="0" value=""></option>
                    {props.restrictions.map((diet) => (
                        <option key={diet.id} value={diet.value}>
                            {diet.text}
                        </option>
                    ))}
                </Select>
            </FormControl>
            {props.valueSelect === "other" && (
                <div className={classes.formControl}>
                    <TextField
                        id="special_diet_comments"
                        label="Indique su dieta"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={props.valueComments}
                        onChange={props.handleChangeComments}
                    />
                </div>
            )}
        </>
    );
};

export default SpecialDiet;
