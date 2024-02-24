import { createTheme } from "@material-ui/core/styles";
import colors from "./styles/colors.module.scss";
import fonts from "./styles/fonts.module.scss";

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: colors.primaryColor,
            light: colors.primaryColor,
            dark: colors.primaryColorDark,
            contrastText: colors.contrastColor,
        },
        secondary: {
            main: colors.secondaryColor,
        },
        background: {
            default: colors.backgroundSecondaryColor,
            paper: colors.backgroundPrimaryColor,
        },
        text: {
            primary: colors.primaryColor,
            secondary: colors.backgroundSecondaryColor,
            danger: colors.dangerColor,
        },
    },

    typography: {
        h1: { fontFamily: fonts.textsFont, fontWeight: 700, fontSize: "34px" },
        h2: { fontFamily: fonts.textsFont, fontWeight: 700, fontSize: "30px" },
        h3: { fontFamily: fonts.textsFont, fontWeight: 700, fontSize: "26px" },
        h4: { fontFamily: fonts.textsFont, fontWeight: 700, fontSize: "22px" },
        h5: { fontFamily: fonts.textsFont, fontWeight: 700, fontSize: "20px" },
        h6: { fontFamily: fonts.textsFont, fontWeight: 700, fontSize: "16px" },
        subtitle1: { fontFamily: fonts.textsFont, fontWeight: 500, fontSize: "18px" },
        subtitle2: { fontFamily: fonts.textsFont, fontWeight: 500, fontSize: "16px" },
        body1: { fontFamily: fonts.textsFont, fontWeight: 400, fontSize: "16px" },
        body2: { fontFamily: fonts.textsFont, fontWeight: 400, fontSize: "15px" },
        button: { fontFamily: fonts.buttonsFont, fontWeight: 700, fontSize: "14px", textTransform: "uppercase" },
    },

    overrides: {
        MuiButton: {
            // Name of the component ⚛️ / style sheet
            contained: {
                backgroundColor: colors.backgroundSecondaryColor,
            },
        },
        MuiCheckbox: {
            root: {
                color: colors.primaryColor,
            },
        },
        MuiInput: {
            input: {
                root: {
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                },
                "&::placeholder": {
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                },
                "& Mui-disabled": {
                    color: colors.primaryColor,
                },
            },
            underline: {
                "&&&&:before": {
                    border: 0,
                },
            },
        },
        MuiInputLabel: {
            root: {
                color: colors.primaryColor,
            },
        },
    },
});

export default theme;
