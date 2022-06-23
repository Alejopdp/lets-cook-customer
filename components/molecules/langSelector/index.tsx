import { memo, useRef, useState } from "react";
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { Routes, localeRoutes } from "lang/routes/routes";

export interface ILan {
    label: string;
    icon: React.ReactElement;
}

export interface ILangs {
    es: ILan;
    en: ILan;
    ca: ILan;
}

interface LangSelectorProps {
    onChangeLang?: (args?: ILan) => void;
}

export const LangSelector = memo(({ onChangeLang }: LangSelectorProps) => {
    const languages: ILangs = {
        es: {
            label: "es",
            icon: <Image src="/assets/img-lang-es.png" width={24} height={24} />,
        },
        en: {
            label: "en",
            icon: <Image src="/assets/img-lang-en.png" width={24} height={24} />,
        },
        ca: {
            label: "ca",
            icon: <Image src="/assets/img-lang-ca.png" width={24} height={24} />,
        },
    };

    const [open, setOpen] = useState(false);
    const anchorRef = useRef();
    const router = useRouter();
    const [lang, setLang] = useState(languages[router.locale]);

    const _toggleOpen = () => {
        setOpen(!open);
    };

    const _handleOptionSelected = (locale: ILan) => {
        const actualPageName = router.pathname.split("/")[1];
        const newBaseUrl = `${localeRoutes[locale.label][Routes[actualPageName]]}`;
        const slugs = `/${router.pathname.split("/").slice(2).join("/")}`;

        onChangeLang && onChangeLang(locale);
        setOpen(false);
        setLang(locale);

        router.replace(
            {
                pathname: `${newBaseUrl}${slugs === "/" ? "" : slugs}`,
                query: { ...router.query },
            },
            undefined,
            { locale: locale.label }
        );
    };

    return (
        <div>
            <Button
                aria-controls="language-selector-menu"
                aria-haspopup="true"
                ref={anchorRef}
                startIcon={lang.icon}
                style={{ marginLeft: "16px" }}
                onClick={_toggleOpen}
            >
                {lang.label}
            </Button>
            <Menu
                id="language-selector-menu"
                anchorEl={anchorRef.current}
                keepMounted
                open={open}
                onClose={_toggleOpen}
                style={{ marginTop: "40px" }}
            >
                {Object.keys(languages).map((key) => (
                    <MenuItem key={key} onClick={() => _handleOptionSelected(languages[key])}>
                        <ListItemIcon> {languages[key].icon} </ListItemIcon>
                        <ListItemText primary={languages[key].label.toUpperCase()} />
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
});
