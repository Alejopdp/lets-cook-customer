import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    default: {
        backgroundColor: "transparent",
        border: "none",
        color: "inherit"
    },
    loginButton: {
        minWidth: 150,
        padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
        borderRadius: 50,
        margin: `0 auto`,
    },
    contentTypography: {
        color: theme.palette.primary.contrastText
    },
    contentBackground: {
        backgroundColor: theme.palette.primary.main
    },
    outlineBorder: {
        border: "solid 1px gray"
    }
}));