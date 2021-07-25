import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    row: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: theme.spacing(3),
    },
    card: {
        display: "flex",
        height: 430,
        boxSizing: "border-box",
        textAlign: "center",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: 8,
    },
    overlay: {
        display: "flex",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        boxSizing: "border-box",
        flexDirection: "column",
        textAlign: "left",
        color: theme.palette.primary.contrastText,
        borderRadius: 8,
        padding: '32px 24px 24px 24px',
    },
    overlayWhite: {
        display: "flex",
        flex: 1,
        backgroundColor: "white",
        boxSizing: "border-box",
        flexDirection: "column",
        textAlign: "left",
        color: theme.palette.text.secondary,
        borderRadius: 8,
        padding: '32px 24px 24px 24px',
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
    },
    cardContent: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        textAlign: "left",
    },
    cardAction: {
        width: "100%",
        marginTop: "auto",
    },
}));


export const useStylesVariantContent = makeStyles((theme) => ({
    formControlRadio: {
        '& span.MuiFormControlLabel-label': {
            fontSize: '16px'
        }
    }
}));
