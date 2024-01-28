import { makeStyles } from "@material-ui/core";
import { hexToRGB } from "../../../helpers/utils/hexToRgb";

export const useStyles = makeStyles((theme) => ({
    default: {
        backgroundColor: "#9AFF77",
        border: "none",
        color: "#000",
        borderRadius: 4,
        minWidth: 225,
        maxHeight: 40,
        padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
        margin: `0 auto`,
        "&:disabled": {
            opacity: 0.6,
        },
        "&:hover": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.main,
        },
    },
    loginButton: {
        borderRadius: 60,
    },
    contentTypography: {
        color: theme.palette.primary.contrastText,
    },
    contentBackground: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0px 3px 16px 0px rgba(${hexToRGB(theme.palette.primary.main)},0.1)`,
        webkitBoxShadow: `0px 3px 16px 0px rgba(${hexToRGB(theme.palette.primary.main)},0.1)`,
        mozBoxShadow: `0px 3px 16px 0px rgba(${hexToRGB(theme.palette.primary.main)},0.1)`,
        transition: "0.25s",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: `0px 6px 24px 0px rgba(${hexToRGB(theme.palette.primary.dark)},0.1)`,
            webkitBoxShadow: `0px 6px 24px 0px rgba(${hexToRGB(theme.palette.primary.dark)},0.1)`,
            mozBoxShadow: `0px 6px 24px 0px rgba(${hexToRGB(theme.palette.primary.dark)},0.1)`,
        },
    },
    outlineBorder: {
        border: "solid 1px gray",
    },
}));
