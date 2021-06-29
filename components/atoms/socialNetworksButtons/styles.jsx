import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        width: "100%",
        // backgroundColor: theme.palette.primary.main,
        border: "1px solid red",
        padding: theme.spacing(1),
        borderRadius: theme.spacing(4),
        marginTop: theme.spacing(2),
        // marginBottom: theme.spacing(2),
        // display: "flex",
        // justifyContent: "space-evenly"
    },
    txt: {
        marginLeft: theme.spacing(2),
        textTransform: "none"
    },
    facebook: {
        border: "2px solid #35569C",
        color: "#35569C"
    },
    google: {
        border: "2px solid #3482FC",
        color: "#3482FC"
    }
}));

export default useStyles;