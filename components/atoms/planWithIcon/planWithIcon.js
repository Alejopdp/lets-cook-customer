// Utils & Config
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

// External components
import { Button, Grid, Typography } from '@material-ui/core';
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    btn: {
        border: "1px solid red",
        padding: theme.spacing(4),
    },
    text: {
        marginTop: theme.spacing(1),
        textTransform: "none"
    }
}));

const PlanWithIcon = () => {
    const classes = useStyles();

    return (
        <Button className={classes.btn}>
            <Grid item container direction="column">
                <Image src="/icons/plan-familiar-color.svg" height={50} width={50} />

                <Typography variant="subtitle1" className={classes.text}>
                    Plan Familiar
                </Typography>
            </Grid>
        </Button>
    )
}

export default PlanWithIcon;
