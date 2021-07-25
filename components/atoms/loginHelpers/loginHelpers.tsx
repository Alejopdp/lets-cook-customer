// Utils & Config
import React from "react";
import useStyles from "./styles";
import { useRouter } from "next/router";
import { ForgotPasswordProps, RegisterProps } from "./interfaces";
import { acceptLegalTerms as langs } from "@lang";

// External components
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, Grid } from "@material-ui/core";

// Icons & Images
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const ForgotPassword = (props: ForgotPasswordProps) => {
    return (
        <Link href="/recuperar-contrasena" style={{ textDecoration: 'none' }}>
            <Typography variant="subtitle2" color="primary" style={{ fontSize: '14px', fontWeight: '600' }}>
                {props.text}
            </Typography>
        </Link>
    );
};

export const Register = (props: RegisterProps) => {
    const { register, btn } = useStyles();
    return (
        // <Link href={redirectTo}>
        <Button className={btn} onClick={props.handleRedirect}>
            <ExitToAppIcon fontSize='small' />
            <Typography variant="body1" className={register}>
                {props.text} <b>{props.boldText}</b>
            </Typography>
        </Button>
        // </Link>
    );
};

export const AcceptLegalTerms = () => {
    const { link } = useStyles();

    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Grid item xs={12}>
            <Typography variant="body2" style={{ fontSize: '14px' }}>
                {lang.continuing}
                <Link href="/aviso-legal" className={link}>
                    <b> {lang.terms} </b>
                </Link>
                {lang.and}
                <Link href="/aviso-legal" className={link}>
                    <b> {lang.politics}</b>
                </Link>
            </Typography>
        </Grid>
    );
};
