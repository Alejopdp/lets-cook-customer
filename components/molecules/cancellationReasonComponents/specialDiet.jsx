// Utils & Config
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

// Internal Components


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        '& .MuiFormControl-root': {
            width: '100%'
        }
    },
}));


const SpecialDiet = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const specialDietsOptions = [
        { id: 1, value: 'G', text: 'No como glúten' },
        { id: 2, value: 'L', text: 'No como lactosa' },
        { id: 3, value: 'V', text: 'Soy vegano' },
        { id: 4, value: 'GL', text: 'No como gluten ni lactosa' },
        { id: 5, value: 'GV', text: 'No como gluten y soy vegano' },
        { id: 6, value: 'other', text: 'Tengo otro tipo de dieta' }
    ]

    const [dietSelected, setDiet] = useState('');

    const handleChange = (event) => {
        setDiet(event.target.value);
    };

    return (
        <>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3) }}>
                Si tienes alguna intolerancia (como gluten o lactosa) o dieta especial (como vegano), lo puedes comunicar y nosotros enviaremos ingredientes que se adapten a tus requerimientos
            </Typography>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(3) }}>
                <InputLabel htmlFor="outlined-age-native-simple">Dieta especial</InputLabel>
                <Select
                    native
                    value={dietSelected}
                    onChange={handleChange}
                    label="Dieta especial"
                    inputProps={{ name: 'id', id: 'planDropdown' }}
                >
                    {specialDietsOptions.map(diet => (
                        <option key={diet.id} value={diet.value}>{diet.text}</option>
                    ))}
                </Select>
            </FormControl>
            {dietSelected === 'other' && (
                <div className={classes.formControl}>
                    <TextField
                        id="special_diet_comments"
                        label="Indique su dieta"
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                </div>
            )}
        </>
    );
}

export default SpecialDiet;