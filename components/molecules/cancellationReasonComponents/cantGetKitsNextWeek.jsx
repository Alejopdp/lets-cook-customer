// Utils & Config
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';



// Internal Components


const useStyles = makeStyles((theme) => ({

}));



const CantGetKitsNextWeek = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const skipWeekData = {
        weeks: [
            { weekId: '1', text: '1 al 7 de marzo', skipped: false },
            { weekId: '2', text: '8 al 15 de marzo', skipped: true },
            { weekId: '3', text: '16 al 23 de marzo', skipped: false },
            { weekId: '4', text: '24 al 31 de marzo', skipped: false },
            { weekId: '5', text: '1 al 7 de abril', skipped: false },
            { weekId: '6', text: '8 al 15 de abril', skipped: false },
            { weekId: '7', text: '16 al 23 de abril', skipped: false },
            { weekId: '8', text: '24 al 1 de mayo', skipped: false },
            { weekId: '9', text: '2 al 8 de mayo', skipped: false },
            { weekId: '10', text: '9 al 16 de mayo', skipped: false },
            { weekId: '11', text: '17 al 24 de mayo', skipped: false },
            { weekId: '12', text: '25 al 2 de junio', skipped: false },
        ]
    }

    return (
        <>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3) }}>
                Si lo que quieres es hacer una pausa por una o varias semana, recomendamos saltar semanas en lugar de cancelar el plan
            </Typography>
            <Autocomplete
                multiple
                id="weeks-to-skip"
                options={skipWeekData.weeks}
                disableCloseOnSelect
                getOptionLabel={(option) => option.text}
                renderOption={(option, { selected }) => (
                    <>
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.text}
                    </>
                )}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Semanas a saltar" />
                )}
            />
        </>
    );
}

export default CantGetKitsNextWeek;