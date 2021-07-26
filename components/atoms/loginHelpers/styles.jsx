import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    register: {
        textTransform: "none",
        marginLeft: theme.spacing(1),
        fontSize: '14px'
    },
    btn: {
        marginTop: theme.spacing(4)
    },
    link: {
        color: "#707070"
    }
}));

export default useStyles;