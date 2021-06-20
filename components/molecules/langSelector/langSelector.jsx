import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import Image from "next/image";


const LangSelector = ({ onChangeLang }) => {

    const languages = {
        es: {
            label: 'es',
            icon: <Image src="/assets/img-lang-es.png" width={24} height={24} />
        },
        en: {
            label: 'en',
            icon: <Image src="/assets/img-lang-en.png" width={24} height={24} />
        },
        ca: {
            label: 'ca',
            icon: <Image src="/assets/img-lang-ca.png" width={24} height={24} />
        }
    }


    const [open, setOpen] = useState(false);
    const anchorRef = useRef();
    const [lang, setLang] = useState(languages.es);

    const _toggleOpen = () => {
        setOpen(!open);
    };

    const _handleOptionSelected = (option) => {
        onChangeLang && onChangeLang(option);
        setOpen(false)
        setLang(option)
    };

    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                ref={anchorRef}
                startIcon={
                    lang.icon
                }
                style={{ marginLeft: '16px' }}
                onClick={_toggleOpen}>
                {lang.label}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorRef.current}
                keepMounted
                open={open}
                onClose={_toggleOpen}
                style={{ marginTop: '40px' }}
            >
                {Object.keys(languages).map((key) =>
                    <MenuItem key={key} onClick={() => _handleOptionSelected(languages[key])}>
                        <ListItemIcon>
                            {languages[key].icon}
                        </ListItemIcon>
                        <ListItemText primary={languages[key].label.toUpperCase()} />
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}

LangSelector.propTypes = {
    onChangeLang: PropTypes.func
}

export default LangSelector;