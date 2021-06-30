// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { IconButton, Toolbar, AppBar, Hidden, makeStyles, Button } from "@material-ui/core";
import Link from "next/link";
import Image from "next/image";

// Internal components
import UserBox from "./userBox";
import LangSelector from "../molecules/langSelector/langSelector";

// Images and icons
import MenuIcon from "@material-ui/icons/Menu";

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
    },
    navbarClass: {
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.1)",
    },
}));

const NavbarContent = (props) => {
    const _handleOnChangeLang = (lang) => {};
    const classes = useStyles();

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
                        <Image src="/logo.png" width={135} height={40} />
                    </Link>
                </div>
                <UserBox />
                {/* <LangSelector onChangeLang={_handleOnChangeLang} /> */}
            </Toolbar>
        </AppBar>
    );
};

NavbarContent.propTypes = {};

export default NavbarContent;
