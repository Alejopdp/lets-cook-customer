import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        width: "100%",
        border: "1px solid red",
        padding: theme.spacing(1.5),
        borderRadius: "8px",
    },
    txt: {
        marginLeft: theme.spacing(2),
        textTransform: "none",
        fontSize: "14px",
    },
    facebook: {
        border: "2px solid #35569C",
        color: "#35569C",
    },
    google: {
        border: "2px solid #3482FC",
        color: "#3482FC",
    },
}));

export default useStyles;
