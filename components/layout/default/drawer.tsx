import React from "react";
import PropTypes from "prop-types";
import { Divider, Drawer, List, ListItem, ListItemText, ListItemIcon, makeStyles } from "@material-ui/core";
import Image from "next/image";
import { LoginButton } from "@atoms";
import { useLang } from "@hooks";
import * as ga from "../../../helpers/ga";
import { useRouter } from "next/router";
import { MyProfileButton } from "components/atoms/myProfileButton";

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
}

const NavbarDrawer = (props: NavbarDrawerProps) => {
    const classes = useStyles();
    const [lang] = useLang("navbarDrawer");
    const router = useRouter();

    const menuOptions = {
        top: [
            { label: lang.itemHome, path: "/", img: "/icons/checkout/home.svg" },
            { label: lang.itemPlans, path: "/planes", img: "/icons/checkout/gestion-del-plan.svg" },
            { label: lang.itemRecipes, path: "/recetas", img: "/icons/checkout/recetas-nuevas.svg" },
        ],
        bottom: [
            { label: lang.itemHowItWork, path: "/como-funciona" },
            { label: lang.itemFAQ, path: "/preguntas-frecuentes" },
            // { label: lang.itemBlog, path: "/blogs/recetas" },
            // { label: lang.itemGif, path: "/bono-regalo" },
            { label: lang.itemLegal, path: "/aviso-legal" },
        ],
    };

    const goToLogin = () => {
        ga.event({
            action: "clic en iniciar sesion",
            params: {
                event_category: props.page ? props.page : "undefined page",
                event_label: "sidebar",
            },
        });
        router.push("/iniciar-sesion");
    };

    const goToMyProfile = () => {
        ga.event({
            action: "clic en mi perfil",
            params: {
                event_category: props.page ? props.page : "undefined page",
                event_label: "sidebar",
            },
        });
        router.push("/perfil");
    };


    

    const goToPage = (sectionName, path) => {
        ga.event({
            action: `clic en ${sectionName.toLowerCase()}`,
            params: {
                event_category: 'menu hamburguesa',
                event_label: sectionName.toLowerCase(),
            },
        });
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
                {props.isAuthenticated ? <MyProfileButton border style={{ width: "100%" }} goToLogin={goToMyProfile} /> :
                    <LoginButton border style={{ width: "100%" }} goToLogin={goToLogin} />}
            </div>
            <List>
                {menuOptions.top.map((option, index) => (
                    <ListItem button component="a" onClick={() => goToPage(option.label, option.path)} key={index}>
                        <ListItemIcon>
                            <Image src={option.img} alt={option.label} width={24} height={24} />
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
