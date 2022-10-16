// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

// Internal Components

const useStyles = makeStyles((theme) => ({}));

const CantGetKitsNextWeek = (props) => {
    const lang = props.lang;
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <Typography variant="body2" color="textSecondary" style={{ fontSize: "16px", marginBottom: theme.spacing(3) }}>
                {lang.modalText}
            </Typography>
            <Autocomplete
                multiple
                id="weeks-to-skip"
                options={props.weeks}
                disableCloseOnSelect
                getOptionLabel={(option) => option.weekLabel}
                getOptionDisabled={(option) => option.isSkipped === true}
                onChange={props.handleChange}
                value={props.value}
                renderOption={(option, { selected }) => (
                    <>
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.weekLabel} {option.isSkipped && `- ${lang.weekAlreadySkipped}`}
                    </>
                )}
                renderInput={(params) => <TextField {...params} variant="outlined" label={lang.inputLabel} />}
            />
        </>
    );
};

export default CantGetKitsNextWeek;
