import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: "8px",
        height: 250,
        background: "rgb(0,0,0)",
        background: "linear-gradient(0deg, rgba(0,0,0,0.9444152661064426) 0%, rgba(0,0,0,0) 100%)",
        zIndex: "99",
    },
    gradient: {
        borderRadius: "8px",
        height: 300,
        backgroundSize: "cover",
    },
    imgTag: {
        width: "max-content",
        backgroundColor: theme.palette.primary.main,
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "600",
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,
        borderRadius: "60px",
        marginRight: theme.spacing(1),
    },
    tag: {
        width: "max-content",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#262626",
        color: theme.palette.primary.contrastText,
        textAlign: "center",
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
        borderRadius: "4px",
        marginRight: theme.spacing(1),
    },
    marg: {
        marginRight: theme.spacing(1),
    },
    textWhite: {
        color: theme.palette.primary.contrastText,
    },
    titleText: {
        marginTop: theme.spacing(1),
    },
    gradient: {},
}));

export default useStyles;
