import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
        borderRadius: "0 8px 8px 0",
        height: "620px",
        [theme.breakpoints.down("md")]: {
            borderRadius: "8px"
        },
    },
    image: {
        borderRadius: "8px 0 0 8px",
    },
    shadow: {
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
    },
    displayImage: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    title: {
        marginBottom: theme.spacing(2)
    }
}));

export default useStyles;