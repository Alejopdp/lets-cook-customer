import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: 250,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: 250,
    },
    drawerContentRoot: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    headerTitle: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        textAlign: "center",
    },
    subtitle: {
        paddingInline: theme.spacing(2),
    },
    bottonApply: {
        paddingInline: theme.spacing(2),
    }

}));
export default useStyles;
