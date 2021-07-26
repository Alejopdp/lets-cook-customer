import { makeStyles } from "@material-ui/core";
import { hexToRGB } from "../../../helpers/utils/hexToRgb";

export const useStyles = makeStyles((theme) => ({
    default: {
        backgroundColor: "transparent",
        border: "none",
        color: "inherit",
        "&:disabled": {
            opacity: 0.6
        }
    },
    loginButton: {
        minWidth: 225,
        padding: `${theme.spacing(1.5)}px ${theme.spacing(6)}px`,
        borderRadius: 8,
        margin: `0 auto`,
    },
    contentTypography: {
        color: theme.palette.primary.contrastText
    },
    contentBackground: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0px 3px 16px 0px rgba(${hexToRGB(theme.palette.primary.main)},0.1)`,
        webkitBoxShadow: `0px 3px 16px 0px rgba(${hexToRGB(theme.palette.primary.main)},0.1)`,
        mozBoxShadow: `0px 3px 16px 0px rgba(${hexToRGB(theme.palette.primary.main)},0.1)`,
        transition: '0.25s',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: `0px 6px 24px 0px rgba(${hexToRGB(theme.palette.primary.dark)},0.1)`,
            webkitBoxShadow: `0px 6px 24px 0px rgba(${hexToRGB(theme.palette.primary.dark)},0.1)`,
            mozBoxShadow: `0px 6px 24px 0px rgba(${hexToRGB(theme.palette.primary.dark)},0.1)`,
        },
    },
    outlineBorder: {
        border: "solid 1px gray"
    }
}));