import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    image: {
        borderRadius: "8px 0 0 8px",
        backgroundImage: "url(/cocina-con-lets-cook.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    box: {
        height: "100%",
        padding: theme.spacing(4),
        borderRadius: "0 8px 8px 0",
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down("md")]: {
            borderRadius: "8px",
        },
    },
    shadow: {
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
    },
    mt1: {
        marginTop: theme.spacing(1),
    },
    mb2: {
        marginBottom: theme.spacing(2),
    },
}));

export default useStyles;
