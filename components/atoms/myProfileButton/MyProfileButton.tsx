import { ButtonBase, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { MyProfileButtonProps } from "./interfaces";
import { useLang } from "@hooks";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const MyProfileButton = (props: MyProfileButtonProps) => {
    const classes = useStyles();
    const [lang] = useLang("loginButton");

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
            <AccountCircle style={{ marginRight: 4 }} />
            <Typography variant="button" color="textPrimary">
                {lang.my_profile}
            </Typography>
        </ButtonBase>
    );
};

export default MyProfileButton;
