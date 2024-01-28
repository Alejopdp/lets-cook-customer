// Utils & config
import React, { FormEvent } from "react";
import { useRouter } from "next/router";

// External components
import { IconButton, Toolbar, AppBar, Hidden, makeStyles } from "@material-ui/core";
import Link from "next/link";
import Image from "next/image";

// Internal components
import { LoginButton, RoundedButton } from "@atoms";
import { LangSelector } from "@molecules";

// Images and icons
import MenuIcon from "@material-ui/icons/Menu";
import { useLang, useLocalStorage } from "@hooks";
import { localeRoutes, Routes } from "lang/routes/routes";
import { useUserInfoStore } from "@stores";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        backgroundColor: "#9AFF77",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    logo: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: {
            justifyContent: "flex-start",
        },
        cursor: "pointer",
    },
    navbarClass: {
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
        backgroundColor: "#E83429",
    },
    cursorPointer: { cursor: "pointer" },
}));

interface NavbarContentProps {
    toggleOpeningDrawer: (e: FormEvent) => void;
    page: string;
}

export const NavbarContent = (props: NavbarContentProps) => {
    const { getFromLocalStorage, saveInLocalStorage } = useLocalStorage();
    const { userInfo, setuserInfo } = useUserInfoStore();
    const _handleOnChangeLang = (lang) => {
        const actualUserInfo = getFromLocalStorage("userInfo");

        if (lang === "es" || lang === "en" || lang === "ca") {
            saveInLocalStorage("userInfo", { ...actualUserInfo, preferredLanguage: lang });
            setuserInfo({ ...userInfo, preferredLanguage: lang });
        }
    };
    const classes = useStyles();
    const router = useRouter();
    const [lang] = useLang("navbarContent");

    const goToPlans = () => {
        // ga.event({
        //     action: "clic en nuestros planes",
        //     params: {
        //         event_category: props.page ? props.page : "undefined page",
        //         event_label: "cabecera",
        //     },
        // });
        router.push(localeRoutes[router.locale][Routes.planes]);
    };

    const goToLogin = () => {
        // ga.event({
        //     action: "clic en iniciar sesion",
        //     params: {
        //         event_category: props.page ? props.page : "undefined page",
        //         event_label: "cabecera",
        //     },
        // });
        router.push(localeRoutes[router.locale][Routes["iniciar-sesion"]]);
    };

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
                    <Link href="https://letscook.es">
                        <Image
                            src="/logo.png"
                            width={152}
                            height={59.5 / 2}
                            alt="lets-cook-logo"
                            className={classes.cursorPointer}
                            unoptimized
                        />
                    </Link>
                </div>
                <Hidden xsDown implementation="css">
                    <LoginButton goToLogin={goToLogin} />
                    <RoundedButton label={lang.seePlans} onClick={goToPlans}></RoundedButton>
                </Hidden>
                <LangSelector onChangeLang={_handleOnChangeLang} />
            </Toolbar>
        </AppBar>
    );
};

export default NavbarContent;
