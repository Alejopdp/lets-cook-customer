import { makeStyles } from "@material-ui/core";

export const useHowItWorksStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    row: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: theme.spacing(3)
    },
    card: {
        width: 260,
        boxSizing: "border-box",
        paddingInline: theme.spacing(1),
        textAlign: "center",
        [theme.breakpoints.down("md")]: {
            marginBottom: theme.spacing(3),
        },
    },
    img: {
        borderRadius: 8,
        height: 170,
        width: "100%",
    },
    paddingCardTitle: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    smallText: {
        paddingTop: theme.spacing(1),
        textAlign: "center"
    }
}));