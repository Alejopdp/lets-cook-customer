import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    lines: {
        height: "1px",
        // backgroundColor: theme.palette.text.primary,
        backgroundColor: "lightGrey",
        width: "45%"
    }
}));