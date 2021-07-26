import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    grid: {
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    lines: {
        height: "1px",
        backgroundColor: "lightGrey",
        width: "50%"
    },
    text: {
        padding: '0px 8px 0px 8px'
    }
}));