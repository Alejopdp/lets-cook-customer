import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    box: {
        height: 160,
        width: 130,
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        border: `1px solid ${theme.palette.text.primary}`,
        backgroundColor: theme.palette.background.paper,
    },
    checkedBox: {
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: "#F2FFF8"
    },
    text: {
        textTransform: "none",
    },
    icon: {
        width: 64,
        height: 64,
        marginBottom: theme.spacing(2),
    }
}));

export default useStyles;