import { useState } from "react";
import { AppBar, Button, ButtonBase, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { Inbox, Menu as MenuIcon } from '@material-ui/icons';
import Image from "next/image";
import LoginButton from '../atoms/loginButton/LoginButton'
import RoundedButton from '../atoms/roundedButton/roundedButton'
import LangSelector from "../molecules/langSelector/langSelector";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: "column"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 250,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: 250,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    menuLogginButton: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        margin: "0 auto"
    },
    logo: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        [theme.breakpoints.up('sm')]: {
            justifyContent: "right",
        }
    }
}));

const Layout = ({ children: Component, ...props }) => {

    const menuOptions = {
        top: [
            { label: 'Inicio', path: '#' },
            { label: 'Planes', path: '#' },
            { label: 'Recetas', path: '#' },
            { label: 'Cómo funciona', path: '#' },
        ],
        bottom: [
            { label: 'Blog', path: '#' },
            { label: 'Preguntas frecuentes', path: '#' },
            { label: 'Bono regalo', path: '#' },
            { label: 'Aviso legal', path: '#' },
        ]
    };

    const classes = useStyles();
    const [openDrawerMenu, setOpenDrawerMenu] = useState(false);

    const _handleOnChangeLang = (lang) => { }

    const _toggleOpeningDrawer = () => {
        setOpenDrawerMenu(!openDrawerMenu);
    }

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
                    <ListItem button key={index} >
                        <ListItemText primary={option.label} />
                    </ListItem>
                ))}
            </List>
        </>
    );
    const AppBarContent = () => (
        <AppBar position="static" color="default">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    className={classes.menuButton}
                    onClick={_toggleOpeningDrawer}>
                    <MenuIcon />
                </IconButton>
                <div className={classes.logo}>
                    <Image src="/logo.png" width={135} height={40} />
                </div>
                <Hidden xsDown implementation="css">
                    <LoginButton />
                    <RoundedButton label="Ver planes" variant="content" ></RoundedButton>
                </Hidden>
                <LangSelector onChangeLang={_handleOnChangeLang} />

            </Toolbar>
        </AppBar>
    );

    return (<div className={classes.root}>
        <CssBaseline />
        <AppBarContent />
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor='left'
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
        </main>
    </div>);
}

export default Layout;