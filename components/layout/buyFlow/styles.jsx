import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        paddingTop: theme.mixins.toolbar.minHeight + theme.spacing(5),
    }
}));
