import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useRouter } from "next/router";

const Options = ({ handleSetSubscriptionId, subscriptionId, handleClickOpenSkipPlanModal, handleClickOpenChangePlanModal, isOneTime }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 32;
    const { locale } = useRouter();

    const handleCloseOptions = () => {
        setAnchorEl(null);
    };

    const handleClickOptions = (event) => {
        setAnchorEl(event.currentTarget);
        handleSetSubscriptionId(subscriptionId);
    };

    const handleClickSkipPlanModal = () => {
        handleClickOpenSkipPlanModal();
        handleCloseOptions();
    };

    const handleClickChangePlan = () => {
        handleClickOpenChangePlanModal();
        handleCloseOptions();
    };

    const options = isOneTime
        ? [{ id: 2, title: { es: "CAMBIAR PLAN", en: "SWAP PLAN", ca: "CANVIAR PLA" }, handleClick: handleClickChangePlan }]
        : [
              { id: 1, title: { es: "SALTAR SEMANA", en: "SKIP WEEK", ca: "SALTAR SETMANA" }, handleClick: handleClickSkipPlanModal },
              { id: 2, title: { es: "CAMBIAR PLAN", en: "SWAP PLAN", ca: "CANVIAR PLA" }, handleClick: handleClickChangePlan },
          ];

    return (
        <div>
            <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClickOptions}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleCloseOptions}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.id} onClick={option.handleClick}>
                        {option.title[locale]}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Options;
