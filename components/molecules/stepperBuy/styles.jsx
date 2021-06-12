import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        textAlign: "center",
        flex: 1,
        justifyContent: "center",
        paddingInline: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    visited: {
        color: theme.palette.primary.main,
        filter: "invert(53%) sepia(100%) saturate(3457%) hue-rotate(118deg) brightness(99%) contrast(102%)",
    },
    active: {
        fontWeight: "bold",
    },
    breadcrumbContainer: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginInline: theme.spacing(1),
        alignItems: "center",
        display: "flex"
    },
    separator: {
        width: 10,
        height: 3,
        backgroundColor: theme.palette.primary.main,
    },
    smUpHide: {
        display: "flex",
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    smDowmHide: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "flex"
        }
    }
}));

export default useStyles;
