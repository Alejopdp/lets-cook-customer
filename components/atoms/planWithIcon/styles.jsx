import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: theme.spacing(2),
        margin: theme.spacing(1),
        height: "150px",
        width: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    checkedBox: {
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: "#F2FFF8"
    },
    text: {
        textTransform: "none"
    },
}));

export default useStyles;