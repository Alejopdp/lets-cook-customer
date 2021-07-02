import { memo } from "react";
import { ButtonBase, Typography } from "@material-ui/core";
import { PersonOutlineRounded } from "@material-ui/icons";
import { useStyles } from './styles';
import { LoginButtonProps } from './interfaces';

export const LoginButton = (props: LoginButtonProps) => {
    const classes = useStyles();
    return (
        <ButtonBase
            focusRipple
            className={classes.loginButton}
            style={{
                border: props.border ? "solid 1px gray" : "none"
            }}
        >
            <PersonOutlineRounded style={{ marginRight: 4 }} />
            <Typography variant="button">Ingresar</Typography>
        </ButtonBase>
    );
};

export default LoginButton;