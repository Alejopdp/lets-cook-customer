import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    box: {
        // height: 160,
        // width: 200,
        width: '100%',
        padding: theme.spacing(2),
        borderRadius: '8px',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: `1px solid ${theme.palette.text.primary}`,
        backgroundColor: theme.palette.background.paper,
    },
    checkedBox: {
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: "#F2FFF8"
    },
    hoverBox: {
        backgroundColor: '#F9F9F9'
    },
    icon: {
        width: 64,
        height: 64,
        marginBottom: theme.spacing(2),
    }
}));

export default useStyles;