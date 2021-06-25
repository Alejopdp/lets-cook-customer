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


const HadProblemsWithLetscook = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3) }}>
                ¡Lo sentimos mucho! Por favor, informa a continuación cuales fueron los problemas que has tenido e intentaremos que no vuelva a suceder
            </Typography>
            <div className={classes.root}>
                <TextField
                    id="had_problems_with_letscook_comments"
                    label="Indica qué problemas has tenido"
                    multiline
                    rows={5}
                    variant="outlined"
                />
            </div>
        </>
    );
}

export default HadProblemsWithLetscook;