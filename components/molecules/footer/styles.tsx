import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    footer: {
        maxWidth: "90vw",
        margin: "0 auto",
        marginTop:theme.spacing(4)
    },
    marg1: {
        marginBottom: theme.spacing(1),
    },
    logoSection: {
        [theme.breakpoints.down("md")]: {
            marginBottom: theme.spacing(3),
            textAlign: 'center'
        },
    },
    paymentMethodsSection: {
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(3),
        },
    }
}));