import { ButtonBase, Typography, useTheme } from "@material-ui/core";
import { PersonOutlineRounded } from "@material-ui/icons";
import { useStyles } from "./styles";
import { LoginButtonProps } from "./interfaces";
import { useLang } from "@hooks";

export const LoginButton = (props: LoginButtonProps) => {
    const classes = useStyles();
    const [lang] = useLang("loginButton");
    const theme = useTheme();
    return (
        <ButtonBase
            focusRipple
            className={classes.loginButton}
            style={{
                color: "#515151",
                border: props.border ? "solid 1px gray" : "none",
                ...props.style,
            }}
            onClick={props.goToLogin}
        >
            <PersonOutlineRounded style={{ marginRight: 4, color: theme.palette.text.secondary }} />
            <Typography variant="button" color="textSecondary">
                {lang.singin}
            </Typography>
        </ButtonBase>
    );
};

export default LoginButton;
