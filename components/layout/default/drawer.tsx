import React from "react";
import { Divider, Drawer, List, ListItem, ListItemText, ListItemIcon, makeStyles } from "@material-ui/core";
import Image from "next/image";
import { LoginButton } from "@atoms";
import { useLang } from "@hooks";
import { useRouter } from "next/router";
import { MyProfileButton } from "components/atoms/myProfileButton";
import { localeRoutes, Routes } from "lang/routes/routes";
import { faqsUrlMap, howItWorksUrlMap } from "helpers/utils/utils";

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: 250,
    },
    menuLogginButton: {
        padding: theme.spacing(2),
        margin: "0 auto",
        width: "100%",
    },
}));

interface NavbarDrawerProps {
    toggleOpeningDrawer: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
    open: boolean;
    isAuthenticated: boolean;
    page?: string;
}

const NavbarDrawer = (props: NavbarDrawerProps) => {
    const classes = useStyles();
    const [lang] = useLang("navbarDrawer");
    const router = useRouter();

    const menuOptions = {
        top: [
            {
                label: lang.itemHome,
                path: `https://letscook.es/${router.locale === "es" ? "" : router.locale}`,
                img: "/icons/checkout/home.svg",
            },
            { label: lang.itemPlans, path: localeRoutes[router.locale][Routes.planes], img: "/icons/checkout/gestion-del-plan.svg" },
            {
                label: lang.itemRecipes,
                path: localeRoutes[router.locale][Routes["menu-semanal"]],
                img: "/icons/checkout/recetas-nuevas.svg",
            },
        ],
        bottom: [
            { label: lang.itemHowItWork, path: howItWorksUrlMap[router.locale] },
            { label: lang.itemFAQ, path: faqsUrlMap[router.locale] },
            { label: lang.itemLegal, path: localeRoutes[router.locale][Routes["aviso-legal"]] },
        ],
    };

    const goToLogin = () => {
        router.push(localeRoutes[router.locale][Routes["iniciar-sesion"]]);
    };

    const goToMyProfile = () => {
        router.push(localeRoutes[router.locale][Routes["perfil"]]);
    };

    const goToPage = (sectionName, path) => {
        router.push(path);
    };

    return (
        <Drawer
            variant="temporary"
            anchor="left"
            open={props.open}
            onClose={props.toggleOpeningDrawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >
            <div className={classes.menuLogginButton}>
                {props.isAuthenticated ? (
                    <MyProfileButton border style={{ width: "100%" }} goToLogin={goToMyProfile} />
                ) : (
                    <LoginButton border style={{ width: "100%" }} goToLogin={goToLogin} />
                )}
            </div>
            <List>
                {menuOptions.top.map((option, index) => (
                    <ListItem button component="a" onClick={() => goToPage(option.label, option.path)} key={index}>
                        <ListItemIcon>
                            <Image src={option.img} alt={option.label} width={24} height={24} unoptimized />
                        </ListItemIcon>
                        <ListItemText primary={option.label} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {menuOptions.bottom.map((option, index) => (
                    <ListItem button component="a" onClick={() => goToPage(option.label, option.path)} key={index}>
                        <ListItemText primary={option.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default NavbarDrawer;
