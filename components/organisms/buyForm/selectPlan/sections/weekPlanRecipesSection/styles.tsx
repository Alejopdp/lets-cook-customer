import { makeStyles } from "@material-ui/core";

export const useRecipesStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    rootCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    title: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6)
    },
    smallText: {
        paddingTop: theme.spacing(1),
    },
    carrusel: {
        height: 300,
        maxWidth: "100vw",
        overflow: "hidden",
        overflowX: "scroll",
        justifyContent: "flex-start",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}));