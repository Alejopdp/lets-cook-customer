import React, { memo, useState } from "react";
import {
    AppBar,
    Link,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    Toolbar,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import Image from "next/image";
import { LoginButton, RoundedButton } from "@atoms";
import { LangSelector, Footer } from "@molecules";

import { CallToActionSection } from "@organisms";
import { useStyles } from "./styles";

interface IOption {
    label: string;
    path: string;
}

interface IMenuOptions {
    top: IOption[];
    bottom: IOption[];
}

interface LayoutProps {
    children: React.Component;
    menuOptions: IMenuOptions
}

const _menuOptions: IMenuOptions = {
    top: [
        { label: "Inicio", path: "#" },
        { label: "Planes", path: "#" },
        { label: "Recetas", path: "#" },
        { label: "Cómo funciona", path: "#" },
    ],
    bottom: [
        { label: "Blog", path: "#" },
        { label: "Preguntas frecuentes", path: "#" },
        { label: "Bono regalo", path: "#" },
        { label: "Aviso legal", path: "#" },
    ],
};

export const Layout = memo(({ children: Component, menuOptions = _menuOptions }: LayoutProps) => {
    const classes = useStyles();
    const theme = useTheme();

    const [openDrawerMenu, setOpenDrawerMenu] = useState(false);

    const _handleOnChangeLang = (lang) => { };

    const _toggleOpeningDrawer = () => {
        setOpenDrawerMenu(!openDrawerMenu);
    };

    const DrawerContent = () => (
        <>
            <div className={classes.menuLogginButton}>
                <LoginButton border />
            </div>
            <List>
                {menuOptions.top.map((option, index) => (
                    <ListItem button component="a" href={option.path} key={index}>
                        <ListItemIcon>
                            <Image src="/assets/icon-test.svg" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary={option.label} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {menuOptions.bottom.map((option, index) => (
                    <ListItem button key={index}>
                        <ListItemText primary={option.label} />
                    </ListItem>
                ))}
            </List>
        </>
    );

    const AppBarContent = () => (
        <AppBar position="fixed" color="default" className={classes.navbarClass}>
            <Toolbar>
                <IconButton
                   edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    className={classes.menuButton}
                    onClick={_toggleOpeningDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <div className={classes.logo}>
                    <Link href="/">
                        <img src="/logo.png" width={106} height={37} />
                    </Link>
                </div>
                <Hidden xsDown implementation="css">
                    <LoginButton />
                    <RoundedButton label="Ver planes" variant="content"></RoundedButton>
                </Hidden>
                <LangSelector onChangeLang={_handleOnChangeLang} />
            </Toolbar>
        </AppBar>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarContent />
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={openDrawerMenu}
                        onClose={_toggleOpeningDrawer}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {DrawerContent()}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                {Component}
                <CallToActionSection />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
});
