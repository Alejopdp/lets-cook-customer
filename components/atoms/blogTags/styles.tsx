import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    tagClass: {
        backgroundColor: theme.palette.background.default,
        padding: "0px 16px 0px 16px",
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        cursor: "pointer",
    },
}));
