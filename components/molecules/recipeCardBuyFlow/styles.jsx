import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: "8px",
        width: "100%",
        // height: 360,
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
    },
    cardCnt: {
        height: "150px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    tag: {
        width: "max-content",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        textAlign: "center",
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
        borderRadius: "4px",
        marginRight: theme.spacing(1),
    },
    marg: {
        marginRight: theme.spacing(1),
    },
    visibilityBtn: {
        marginLeft: "-16px",
    },
}));

export default useStyles;
