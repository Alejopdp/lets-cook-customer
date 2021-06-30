import React from "react";
import PropTypes from "prop-types";
import { Divider, Drawer, List, ListItem, ListItemText, ListItemIcon, makeStyles } from "@material-ui/core";
import Image from "next/image";
import LoginButton from "../atoms/loginButton/LoginButton";

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: 250,
    },
    menuLogginButton: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        margin: "0 auto",
    },
}));

const menuOptions = {
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

const NavbarDrawer = (props) => {
    const classes = useStyles();

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
        </Drawer>
    );
};

NavbarDrawer.propTypes = {};

export default NavbarDrawer;
