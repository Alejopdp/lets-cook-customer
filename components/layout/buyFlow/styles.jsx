import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: theme.spacing(2)
    },

    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        paddingTop: theme.mixins.toolbar.minHeight + theme.spacing(5),
    },

    logo: {
        flex: 1,
        textAlign: "center",
        [theme.breakpoints.up("sm")]: {
            display: "contents",
            textAlign: "left",
        },
    },

    navbarClass: {
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
    },
}));
