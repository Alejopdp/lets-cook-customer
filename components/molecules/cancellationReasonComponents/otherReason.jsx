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


const OtherReason = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3) }}>
                Por favor, indica cual es la razón principal para cancelar tu plan
            </Typography>
            <div className={classes.root}>
                <TextField
                    id="other_reason_comments"
                    label="Indica la razón de su cancelación"
                    multiline
                    rows={5}
                    variant="outlined"
                />
            </div>
        </>
    );
}

export default OtherReason;