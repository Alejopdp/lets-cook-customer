import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        maxWidth: "100vw",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
        overflowX: "scroll",
        padding: theme.spacing(4),
        // paddingRight: theme.spacing(4),
    },
    smUpHide: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    smDownHide: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
        },
    },
    recipeSection: {
        backgroundColor: theme.palette.common.white,
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(16),
    },
    faqsTitle: {
        textAlign: "center",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    footer: {
        marginTop: theme.spacing(5),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        backgroundColor: theme.palette.common.white,
    },
    footerItem: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));
