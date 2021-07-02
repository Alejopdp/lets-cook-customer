import { memo } from "react";
import { ButtonBase, Typography } from "@material-ui/core";
import { PersonOutlineRounded } from "@material-ui/icons";
import { useStyles } from './styles';
import { LoginButtonProps } from './interfaces';
import { useRouter } from "next/router";

export const LoginButton = (props: LoginButtonProps) => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <ButtonBase
            focusRipple
            className={classes.loginButton}
            style={{
                border: props.border ? "solid 1px gray" : "none"
            }}
            onClick={() => router.push("/ingresar")}
        >
            <PersonOutlineRounded style={{ marginRight: 4 }} />
            <Typography variant="button">Ingresar</Typography>
        </ButtonBase>
    );
};

export default LoginButton;