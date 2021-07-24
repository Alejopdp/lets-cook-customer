import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    faqsSection: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    reviewsSection: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),    
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
        height: '100%',
        width: 1,
        margin: 'auto',
        backgroundImage: "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='transparent' stroke='%23c7c7c7' stroke-width='1' stroke-dasharray='10' stroke-dashoffset='96' stroke-linecap='butt'/%3e%3c/svg%3e\")"
    },
}));
