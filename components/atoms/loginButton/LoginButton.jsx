import React from "react";
import { ButtonBase, makeStyles, Typography } from "@material-ui/core";
import { PersonOutlineRounded } from "@material-ui/icons";
// import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    loginButton: {
        width: 150,
        padding: theme.spacing(1),
        borderRadius: 50,
        margin: `0 auto`,
    },
}));

const LoginButton = ({ border = false, ...props }) => {
    const classes = useStyles();
    // const { push } = useRouter();

    return (
        <ButtonBase
            focusRipple
            className={classes.loginButton}
            style={{
                border: border ? "solid 1px gray" : "none",
            }}
            // onClick={push("/ingresar")}
        >
            <PersonOutlineRounded style={{ marginRight: 4 }} />
            <Typography variant="button">Ingresar</Typography>
        </ButtonBase>
    );
};

export default LoginButton;
