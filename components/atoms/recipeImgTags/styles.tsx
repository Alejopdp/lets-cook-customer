import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    imgTag: {
        width: "max-content",
        backgroundColor: theme.palette.secondary.main,
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "bolder",
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,
        borderRadius: "60px",
        marginRight: theme.spacing(1),
    },
    textWhite: {
        color: theme.palette.primary.contrastText,
    }
}));
