// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components
import Grid from "@material-ui/core/Grid";

// Internal components
import BoxWithTitleAndTextButton from "../../../molecules/specificBox/boxWithTitleAndTextButton";
import DataDisplay from "../../../molecules/dataDisplay/dataDisplay";

const useStyles = makeStyles((theme) => ({
    nextChargeGrid: {
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2)
        },
        [theme.breakpoints.up('sm')]: {
            borderLeft: '2px dashed #E5E5E5',
            paddingLeft: theme.spacing(4)
        },
    }
}));

const CalendarCard = props => {
    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <BoxWithTitleAndTextButton title='Calendario' btnText='saltar semana'>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <DataDisplay title='Próxima entrega' text={props.calendar.nextShippingDate} />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.nextChargeGrid}>
                    <DataDisplay title='Próximo cargo' text={props.calendar.nextChargeDate} />
                </Grid>
            </Grid>
        </BoxWithTitleAndTextButton>
    );
};

export default CalendarCard;
