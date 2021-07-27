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
        width: '100%',
        height: 360,
        boxSizing: "border-box",
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
    },
    cardContent: {
        width: '100%',
        display: "flex",
        flex: 1,
        flexDirection: "column",
        padding: `${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
        textAlign: "left"
    },
    cardAction: {
        padding: theme.spacing(2),
        width: '100%'
    },
}));