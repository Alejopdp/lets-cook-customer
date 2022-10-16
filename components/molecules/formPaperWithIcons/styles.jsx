import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        borderRadius: theme.spacing(1),
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
    },
    title: {
        display: "flex",
        alignItems: "center",
    },
    alignIcons: {
        display: "flex",
        alignItems: "center",
    },
    titleMargin: {
        marginLeft: theme.spacing(1.5),
    },
}));

export default useStyles;
