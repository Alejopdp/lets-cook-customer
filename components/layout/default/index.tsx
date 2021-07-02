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
import NavbarContent from "./navbarContent";
import LoggedInNavbar from "./loggedInNavbarContent";
import NavbarDrawer from "./drawer";
import { Footer } from "@molecules";

import { CallToActionSection } from "@organisms";
import { useStyles } from "./styles";
import { useAuthStore } from "@stores";

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

export const Layout = memo(({ children: Component }: LayoutProps) => {
    const classes = useStyles();
    const isAuthenticated = useAuthStore(({isAuthenticated}) => isAuthenticated);
    const [openDrawerMenu, setOpenDrawerMenu] = useState(false);

    const _toggleOpeningDrawer = () => {
        setOpenDrawerMenu(!openDrawerMenu);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            {isAuthenticated ? (
                <LoggedInNavbar toggleOpeningDrawer={_toggleOpeningDrawer} />
            ) : (
                <NavbarContent toggleOpeningDrawer={_toggleOpeningDrawer} />
            )}
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <NavbarDrawer open={openDrawerMenu} toggleOpeningDrawer={_toggleOpeningDrawer} />
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
export default Layout;