import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    footer: {
        maxWidth: "90vw",
        margin: "0 auto",
    },
    marg1: {
        marginBottom: theme.spacing(1),
    },
}));