// Utils & Config
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// Internal Components


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%'
        }
    }
}));


const DontLikeMealKits = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3) }}>
                ¡Muchas gracias por probarlos! ¿Qué es lo que no te gusta de los kits para cocinar (meal kits)?
            </Typography>
            <div className={classes.root}>
                <TextField
                    id="dont_like_meal_kits_comments"
                    label="Ingrese aquí sus comentarios"
                    multiline
                    rows={5}
                    variant="outlined"
                    value={props.value}
                    onChange={props.handleChange}
                />
            </div>
        </>
    );
}

export default DontLikeMealKits;