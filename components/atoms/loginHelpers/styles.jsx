import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    register: {
        textTransform: "none",
        marginLeft: theme.spacing(1),
    },
    btn: {
        marginTop: theme.spacing(4)
    },
    margin: {
        marginTop: theme.spacing(6)
    },
    link: {
        color: "#707070"
    }
}));

export default useStyles;