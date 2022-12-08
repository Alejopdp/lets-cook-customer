import React, { useState } from "react";
import { CssBaseline, Hidden } from "@material-ui/core";
import { CallToActionSection } from "@organisms";
import styles from "./styles.module.scss";
import { useAuthStore } from "@stores";
import Head from "next/head";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../../molecules/footer").then((mod) => mod.Footer));
const LoggedInNavbar = dynamic(() => import("./loggedInNavbarContent"));
const NavbarDrawer = dynamic(() => import("./drawer"));
const NavbarContent = dynamic(() => import("./navbarContent"));

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
    menuOptions?: IMenuOptions;
    seoTitle?: string;
    seoDescriptionContent?: string;
    seoOgUrl?: string;
    seoOgUrlSlug?: string;
    disableFooterSection?: boolean;
    disableCallToActionSection?: boolean;
    page?: string;
    canonicalUrl?: string;
}

export const Layout = (props: LayoutProps) => {
    const isAuthenticated = useAuthStore(({ isAuthenticated }) => isAuthenticated);
    const [openDrawerMenu, setOpenDrawerMenu] = useState(false);

    const _toggleOpeningDrawer = () => {
        setOpenDrawerMenu(!openDrawerMenu);
    };

    return (
        <div>
            <Head>
                <title>{props.seoTitle ? props.seoTitle : "Let's cook: Productos frescos y recetas"}</title>
                <meta
                    name="description"
                    content={
                        props.seoDescriptionContent
                            ? props.seoDescriptionContent
                            : "Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana."
                    }
                />
                <meta property="og:site_name" content={props.seoTitle ? props.seoTitle : "Let's cook: Productos frescos y recetas"} />
                <meta property="og:image" content="https://i.ibb.co/s31H9Lz/logo-Letscook.jpg" />
                <meta property="og:title" content={props.seoTitle ? props.seoTitle : "Let's cook: Productos frescos y recetas"} />
                <meta
                    property="og:description"
                    content={
                        props.seoDescriptionContent
                            ? props.seoDescriptionContent
                            : "Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana."
                    }
                />
                <meta
                    property="og:url"
                    content={props.seoOgUrl ? `https://letscooknow.es/${props.seoOgUrlSlug}` : "https://letscooknow.es/"}
                />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={props.seoTitle ? props.seoTitle : "Let's cook: Productos frescos y recetas"} />
                <meta
                    name="twitter:description"
                    content="Llevamos a tu casa todo lo que necesitas para preparar la cena. Productos frescos y recetas para cocinar platos buenos y ricos cada semana."
                />
                <link rel="icon" href="/favicon.png" />
                {!!props.canonicalUrl && <link rel="canonical" href={props.canonicalUrl} />}
            </Head>
            <div className={styles.root}>
                <CssBaseline />
                {isAuthenticated ? (
                    <LoggedInNavbar toggleOpeningDrawer={_toggleOpeningDrawer} />
                ) : (
                    <NavbarContent page={props.page} toggleOpeningDrawer={_toggleOpeningDrawer} />
                )}
                <nav className={styles.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <NavbarDrawer
                            page={props.page}
                            open={openDrawerMenu}
                            toggleOpeningDrawer={_toggleOpeningDrawer}
                            isAuthenticated={isAuthenticated}
                        />
                    </Hidden>
                </nav>
                <main className={styles.content}>
                    {props.children}
                    {!props.disableCallToActionSection && <CallToActionSection page={props.page} />}
                </main>
                {!props.disableFooterSection && (
                    <footer>
                        <Footer />
                    </footer>
                )}
            </div>
        </div>
    );
};
export default Layout;
