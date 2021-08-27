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
import Head from 'next/head'

interface IOption {
    label: string;
    path: string;
}

interface IMenuOptions {
    top: IOption[];
    bottom: IOption[];
}

interface LayoutProps {
    children: React.ReactNode;
    menuOptions?: IMenuOptions
}

// export const Layout = memo(({ children: Component }: LayoutProps ) => {
export const Layout = props => {
    const classes = useStyles();
    const isAuthenticated = useAuthStore(({ isAuthenticated }) => isAuthenticated);
    const [openDrawerMenu, setOpenDrawerMenu] = useState(false);

    const _toggleOpeningDrawer = () => {
        setOpenDrawerMenu(!openDrawerMenu);
    };

    return (
        <>
            <Head>
                <title>{props.seoTitle ? props.seoTitle : 'Let\'s cook: Productos frescos y recetas'}</title>
                <meta name="description" content={props.seoDescriptionContent ? props.seoDescriptionContent : 'Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana.'} />
                <meta property="og:site_name" content={props.seoTitle ? props.seoTitle : 'Let\'s cook: Productos frescos y recetas'} />
                <meta property="og:image" content="https://i.ibb.co/s31H9Lz/logo-Letscook.jpg" />
                <meta property="og:title" content={props.seoTitle ? props.seoTitle : 'Let\'s cook: Productos frescos y recetas'} />
                <meta property="og:description" content={props.seoDescriptionContent ? props.seoDescriptionContent : 'Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana.'} />
                <meta property="og:url" content={props.seoOgUrl ? `https://letscooknow.es/${seoOgUrlSlug}` : 'https://letscooknow.es/'} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={props.seoTitle ? props.seoTitle : 'Let\'s cook: Productos frescos y recetas'} />
                <meta name="twitter:description" content="Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana." />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className={classes.root}>
                <CssBaseline />
                {isAuthenticated ? (
                    <LoggedInNavbar toggleOpeningDrawer={_toggleOpeningDrawer} />
                ) : (
                        <NavbarContent page={props.page} toggleOpeningDrawer={_toggleOpeningDrawer} />
                    )}
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <NavbarDrawer page={props.page} open={openDrawerMenu} toggleOpeningDrawer={_toggleOpeningDrawer} isAuthenticated={isAuthenticated}/>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    {props.children}
                    {!props.disableCallToActionSection && (
                        <CallToActionSection page={props.page} />
                    )}
                </main>
                {!props.disableFooterSection && (
                    <footer>
                        <Footer />
                    </footer>
                )}
            </div>
        </>
    );
};
export default Layout;