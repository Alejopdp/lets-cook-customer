import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: "0 auto",
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(4),
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        // height: "620px",
        maxWidth: "586px",
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
    },
    title: {
        display: "flex",
        alignItems: "flex-end",
        marginBottom: theme.spacing(2),
    },
    alignIcons: {
        display: "flex",
        alignItems: "center"
    },
    titleMargin: {
        marginLeft: theme.spacing(2)
    }
}));

export default useStyles;