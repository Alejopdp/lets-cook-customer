import { makeStyles } from "@material-ui/core";

export const usePlansStyles = makeStyles(theme => ({
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
        display: "flex",
        // width: 260,
        height: 400,
        boxSizing: "border-box",
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        textAlign: "center",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: 8
    },
    overlay: {
        display: "flex",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center",
        color: theme.palette.primary.contrastText,
        borderRadius: 8,
        padding: theme.spacing(1),
    },
    cardContent: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        padding: theme.spacing(2),
        paddingTop: theme.spacing(4),
        textAlign: "left"
    },
    cardAction: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    img: {},
    paddingCardTitle: {},
    title: {},
    content: {},
}));