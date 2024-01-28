import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Button, ListItemText, Menu, MenuItem, useTheme } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuthStore, useUserInfoStore } from "@stores";
import { useRouter } from "next/router";
import ExpandMore from "@material-ui/icons/ExpandMore";
import cookies from "js-cookie";
import { useLang, useLocalStorage } from "@hooks";
import { localeRoutes, Routes } from "lang/routes/routes";

const UserBox = () => {
    const theme = useTheme();
    const router = useRouter();
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef();
    const { removeFromLocalStorage } = useLocalStorage();
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const setuserInfo = useUserInfoStore((state) => state.setuserInfo);
    const [lang] = useLang("userBox");

    const _toggleOpen = () => {
        setOpen(!open);
    };

    const _handleOptionSelected = (pathToRedirect) => {
        setOpen(false);
        router.push(pathToRedirect);
    };

    const handleSignOut = async () => {
        await router.push("https://letscook.es");
        cookies.remove("token");
        removeFromLocalStorage("token");
        removeFromLocalStorage("userInfo");
        setuserInfo({});
        setIsAuthenticated(false);
    };

    const options = {
        es: [
            {
                title: lang.titlePlans,
                path: localeRoutes[router.locale][Routes.perfil],
                handler: () => _handleOptionSelected(localeRoutes[router.locale][Routes.perfil]),
            },
            {
                title: lang.titleAccountSettings,
                path: `/${localeRoutes[router.locale][Routes.perfil]}/${userInfo.id}`,
                handler: () => _handleOptionSelected(localeRoutes[router.locale][Routes.configuracion]),
            },
            {
                title: lang.titleHistoryPayments,
                path: localeRoutes[router.locale][Routes["historial-pagos"]],
                handler: () => _handleOptionSelected(localeRoutes[router.locale][Routes["historial-pagos"]]),
            },
            {
                title: lang.titleRateRecipes,
                path: `${localeRoutes[router.locale][Routes["valorar-recetas"]]}/${userInfo.id}`,
                handler: () => _handleOptionSelected(`${localeRoutes[router.locale][Routes["valorar-recetas"]]}/${userInfo.id}`),
            },

            { title: lang.titleCloseSession, path: "/", handler: handleSignOut },
        ],
        en: [
            { title: lang.titlePlans, path: localeRoutes[router.locale][Routes.perfil], handler: () => _handleOptionSelected("/") },
            {
                title: lang.titleAccountSettings,
                path: localeRoutes[router.locale][Routes.configuracion],
                handler: () => _handleOptionSelected("/"),
            },
            {
                title: lang.titleHistoryPayments,
                path: localeRoutes[router.locale][Routes["historial-pagos"]],
                handler: () => _handleOptionSelected(localeRoutes[router.locale][Routes["historial-pagos"]]),
            },
            {
                title: lang.titleRateRecipes,
                path: `${localeRoutes[router.locale][Routes["valorar-recetas"]]}/${userInfo.id}`,
                handler: () => _handleOptionSelected(`${localeRoutes[router.locale][Routes["valorar-recetas"]]}/${userInfo.id}`),
            },
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
                startIcon={<AccountCircle color={theme.palette.background.default} />}
                endIcon={<ExpandMore color={theme.palette.background.default} />}
                style={{ marginLeft: "16px", color: theme.palette.background.default }}
                onClick={_toggleOpen}
            >
                {userInfo.firstName || lang.myAccount}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorRef.current}
                keepMounted
                open={open}
                onClose={_toggleOpen}
                style={{ marginTop: "40px", color: theme.palette.background.default }}
            >
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
