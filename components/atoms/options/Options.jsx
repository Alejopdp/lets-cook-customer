import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Options = ({ handleSetSubscriptionId, subscriptionId, handleClickOpenSkipPlanModal, handleClickOpenChangePlanModal, isOneTime }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 32;

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
        ? [{ id: 2, title: "CAMBIAR PLAN", handleClick: handleClickChangePlan }]
        : [
              { id: 1, title: "SALTAR SEMANA", handleClick: handleClickSkipPlanModal },
              { id: 2, title: "CAMBIAR PLAN", handleClick: handleClickChangePlan },
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
                        {option.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Options;
