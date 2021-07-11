import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        maxWidth: "100vw",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
        overflowX: "auto",
        padding: theme.spacing(4),
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
    divider: {
        height:'100%',
        width:1,
        margin:'auto',
        backgroundImage: "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='transparent' stroke='%23c7c7c7' stroke-width='1' stroke-dasharray='10' stroke-dashoffset='96' stroke-linecap='butt'/%3e%3c/svg%3e\")"
    },
    separatorOffset: {
        height: theme.spacing(8)
    }
}));
