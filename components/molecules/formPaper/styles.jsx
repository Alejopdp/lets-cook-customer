import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(4),
        borderRadius: "0 8px 8px 0",
        minHeight: "620px",
        maxWidth: "586px",
        [theme.breakpoints.down("md")]: {
            borderRadius: "8px"
        },
    },
    shadow: {
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
    },
    image: {
        width: "500px",
        borderRadius: "8px 0 0 8px",
        backgroundImage: "url(https://i.postimg.cc/ncHrXQLM/beneficios.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    title: {
        marginBottom: theme.spacing(3)
    }
}));

export default useStyles;