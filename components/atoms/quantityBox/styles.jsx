import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: theme.spacing(1),
        margin: theme.spacing(1),
        marginLeft: "0",
        height: "50px",
        width: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    checkedBox: {
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: "#F2FFF8"
    },
    hidden: {
        display: "none"
    }
}));

export default useStyles;