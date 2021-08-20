// Utils & config
import React, { FormEvent } from "react";
import { useRouter } from "next/router";
import * as ga from '../../../helpers/ga';

// External components
import { IconButton, Toolbar, AppBar, Hidden, makeStyles } from "@material-ui/core";
import Link from "next/link";
import Image from "next/image";

// Internal components
import { LoginButton, RoundedButton } from "@atoms";
import { LangSelector } from "@molecules";

// Images and icons
import MenuIcon from "@material-ui/icons/Menu";
import { useLang } from "@hooks";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    logo: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: {
            justifyContent: "right",
        },
        cursor: "pointer",
    },
    navbarClass: {
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
        backgroundColor: theme.palette.background.paper
    },
    cursorPointer: { cursor: "pointer" }
}));

interface NavbarContentProps {
    toggleOpeningDrawer: (e: FormEvent) => void,
    page: string
}

export const NavbarContent = (props: NavbarContentProps) => {
    const _handleOnChangeLang = (lang) => { };
    const classes = useStyles();
    const router = useRouter();
    const [lang] = useLang('navbarContent')

    const goToPlans = () => {
        ga.event({
            action: "clic en nuestros planes",
            params: {
                event_category: props.page ? props.page : 'undefined page',
                event_label: 'cabecera',
            }
        })
        router.push("/planes")
    }

    const goToLogin = () => {
        ga.event({
            action: "clic en iniciar sesion",
            params: {
                event_category: props.page ? props.page : 'undefined page',
                event_label: 'cabecera',
            }
        })
        router.push("/iniciar-sesion")
    }


    return (
        <AppBar position="fixed" color="default" className={classes.navbarClass}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    className={classes.menuButton}
                    onClick={props.toggleOpeningDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <div className={classes.logo}>
                    <Link href="/">
                        <Image src="/logo.png" width={115} height={40} alt="lets-cook-logo" className={classes.cursorPointer} />
                    </Link>
                </div>
                <Hidden xsDown implementation="css">
                    <LoginButton goToLogin={goToLogin} />
                    <RoundedButton label={lang.seePlans} variant="content" onClick={goToPlans}></RoundedButton>
                </Hidden>
                <LangSelector onChangeLang={_handleOnChangeLang} />
            </Toolbar>
        </AppBar>
    );
};

export default NavbarContent;
