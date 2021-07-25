import React from "react";
import PropTypes from "prop-types";
import { Divider, Drawer, List, ListItem, ListItemText, ListItemIcon, makeStyles } from "@material-ui/core";
import Image from "next/image";
import { LoginButton } from "@atoms";
import { useLang } from "@hooks";

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: 250,
    },
    menuLogginButton: {
        padding: theme.spacing(2),
        margin: "0 auto",
    },
}));

interface NavbarDrawerProps {
    toggleOpeningDrawer: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
    open: boolean;
}

const NavbarDrawer = (props: NavbarDrawerProps) => {
    const classes = useStyles();
    const [lang] = useLang("navbarDrawer");

    const menuOptions = {
        top: [
            { label: lang.itemHome, path: "#" },
            { label: lang.itemPlans, path: "#" },
            { label: lang.itemRecipes, path: "#" },
            { label: lang.itemHowItWork, path: "#" },
        ],
        bottom: [
            { label: lang.itemBlog, path: "#" },
            { label: lang.itemFAQ, path: "#" },
            { label: lang.itemGif, path: "#" },
            { label: lang.itemLegal, path: "#" },
        ],
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
                <LoginButton border style={{ width: '100%' }} />
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

export default NavbarDrawer;
