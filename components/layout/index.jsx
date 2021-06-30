import { useState } from "react";
import { CssBaseline, Hidden, makeStyles, useTheme } from "@material-ui/core";
import Footer from "../molecules/footer/footer";
import CallToActionSection from "../organisms/sections/CallToActionSection";
import NavbarContent from "./navbarContent";
import LoggedInNavbar from "./loggedInNavbarContent";
import NavbarDrawer from "./drawer";
import { useAuthStore } from "../../stores/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: 250,
            flexShrink: 0,
        },
    },

    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
    },
}));

const Layout = ({ children: Component, ...props }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
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
};

export default Layout;
