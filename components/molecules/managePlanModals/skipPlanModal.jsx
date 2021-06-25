// Utils & Config
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from "clsx";

// External Components
import Modal from '../../atoms/modal/modal';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    generalBoxStyle: {
        height: '100px',
        padding: theme.spacing(3),
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    activeWeek: {
        backgroundColor: 'white',
        color: theme.palette.text.secondary,
        border: '1px solid rgba(0,0,0,0.1)'
    },
    skippedWeek: {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    }
}));


const SkipPlanModal = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [weeksStore, setWeeksStore] = useState([]);

    useEffect(() => {
        setWeeksStore(props.data.weeks)
    }, [props.open]);

    const skipWeek = (weekId) => {
        let weekIndexSelected = weeksStore.findIndex(week => week.weekId === weekId)
        let weekToModify = weeksStore[weekIndexSelected]
        weekToModify['skipped'] = !weekToModify['skipped']
        setWeeksStore([
            ...weeksStore.slice(0, weekIndexSelected),
            weekToModify,
            ...weeksStore.slice(weekIndexSelected + 1),
        ])
    }

    const submitSkippedWeeks = () => {
        props.handlePrimaryButtonClick(weeksStore);
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={submitSkippedWeeks}
            title='Saltar semana'
            primaryButtonText='saltar semana'
            secondaryButtonText='cancelar'
            fullScreen={true}
            maxWidth='lg'
        >
            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3) }}>
                Haga click a continuación sobre la semana que desea saltar
            </Typography>
            <Grid container spacing={2}>
                {weeksStore.map((week, index) => (
                    <Grid key={week.weekId} item xs={6} sm={3}>
                        <Box className={clsx(classes.generalBoxStyle, week.skipped ? classes.skippedWeek : classes.activeWeek)} onClick={() => skipWeek(week.weekId)}>
                            <Typography variant='subtitle2' style={{ fontSize: '16px' }}>
                                {week.text}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Modal>
    );
}

export default SkipPlanModal;