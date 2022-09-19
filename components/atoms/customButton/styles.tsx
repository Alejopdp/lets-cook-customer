import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.paper,
        padding: theme.spacing(2),
        borderRadius: 60,
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
        "&:disabled": {
            backgroundColor: theme.palette.background.default,
        },
    },
    slimButton: {
        padding: theme.spacing(0.5),
    },
    box: {
        display: "flex",
        flexDirection: "row",
    },
}));
