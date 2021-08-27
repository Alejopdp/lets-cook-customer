import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: 400,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: '80%',
        [theme.breakpoints.up("sm")]: {
            width: 400,
        },
        padding: `${theme.spacing(5)}px ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,

    },
    drawerContentRoot: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
}));
export default useStyles;
