import { createTheme } from "@material-ui/core/styles";
import colors from "./styles/colors.module.scss";
import fonts from "./styles/fonts.module.scss";

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: colors.primaryColor,
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
            primary: colors.titleColor,
            secondary: colors.paragraphColor,
            danger: colors.dangerColor,
        },
    },

    typography: {
        h1: { fontFamily: fonts.titleFont, fontWeight: 800, fontSize: '34px' },
        h2: { fontFamily: fonts.titleFont, fontWeight: 700, fontSize: '30px' },
        h3: { fontFamily: fonts.titleFont, fontWeight: 700, fontSize: '26px' },
        h4: { fontFamily: fonts.titleFont, fontWeight: 700, fontSize: '22px' },
        h5: { fontFamily: fonts.titleFont, fontWeight: 700, fontSize: '20px' },
        h6: { fontFamily: fonts.titleFont, fontWeight: 700, fontSize: '16px' },
        subtitle1: { fontFamily: fonts.titleFont, fontWeight: 600, fontSize: '18px' },
        subtitle2: { fontFamily: fonts.titleFont, fontWeight: 600, fontSize: '16px' },
        body1: { fontFamily: fonts.paragraphFont, fontWeight: 400, fontSize: '16px' },
        body2: { fontFamily: fonts.paragraphFont, fontWeight: 400, fontSize: '15px' },
        button: { fontFamily: fonts.titleFont, fontWeight: 800, fontSize: '14px' },
    },

    overrides: {
        MuiButton: {
            // Name of the component ⚛️ / style sheet
            contained: {
                backgroundColor: colors.backgroundSecondaryColor,
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
            },
            underline: {
                "&&&&:before": {
                    border: 0,
                },
            },
        },
    },
});

export default theme;
