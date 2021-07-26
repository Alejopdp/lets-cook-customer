import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuthStore, useUserInfoStore } from "@stores";
import { useRouter } from "next/router";
import ExpandMore from "@material-ui/icons/ExpandMore";
import cookies from "js-cookie";
import { useLang, useLocalStorage } from "@hooks";

const UserBox = (props) => {
    const router = useRouter();
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef();
    const { resetLocalStorage } = useLocalStorage();
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const setuserInfo = useUserInfoStore((state) => state.setuserInfo);
    const [lang] = useLang('userBox');

    const _toggleOpen = () => {
        setOpen(!open);
    };

    const _handleOptionSelected = (pathToRedirect) => {
        setOpen(false);
        router.push(pathToRedirect);
    };

    const handleSignOut = () => {
        cookies.remove("token");
        resetLocalStorage();
        setuserInfo({});
        setIsAuthenticated(false);
    };

    const options = {
        es: [
            { title: lang.titlePlans, path: "/perfil", handler: () => _handleOptionSelected("/") },
            { title: lang.titleAccountSettings, path: "/user-info", handler: () => _handleOptionSelected("/") },
            { title: lang.titleHistoryPayments, path: "/historial-pagos", handler: () => _handleOptionSelected("/") },
            { title: lang.titleCloseSession, path: "/", handler: handleSignOut },
        ],
        en: [
            { title: lang.titlePlans, path: "/", handler: () => _handleOptionSelected("/") },
            { title: lang.titleAccountSettings, path: "/", handler: () => _handleOptionSelected("/") },
            { title: lang.titleHistoryPayments, path: "/", handler: () => _handleOptionSelected("/") },
            { title: lang.titleCloseSession, path: "/", handler: handleSignOut },
        ],
    };

    return (
        <div>
            <Button
                variant="text"
                aria-controls="simple-menu"
                aria-haspopup="true"
                ref={anchorRef}
                startIcon={<AccountCircle />}
                endIcon={<ExpandMore />}
                style={{ marginLeft: "16px" }}
                onClick={_toggleOpen}
            >
                {userInfo.firstName || lang.myAccount}
            </Button>
            <Menu id="simple-menu" anchorEl={anchorRef.current} keepMounted open={open} onClose={_toggleOpen} style={{ marginTop: "40px" }}>
                {options["es"].map((item, index) => (
                    <MenuItem key={index} onClick={item.handler}>
                        <ListItemText primary={item.title} />
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

UserBox.propTypes = {
    onChangeLang: PropTypes.func,
};

export default UserBox;
