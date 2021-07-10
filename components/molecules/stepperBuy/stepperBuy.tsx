import { memo } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Typography, Breadcrumbs, Hidden } from "@material-ui/core";
import { useBuyFlow } from "@stores";
import useStyles from "./styles";

interface StepperBuyProps {
    steps: {
        icon: string,
        label: string,
    }[];
    smUpHide?: boolean;
    smDowmHide?: boolean;
}

export const StepperBuy = memo(({ steps, smUpHide, smDowmHide }: StepperBuyProps) => {
    
    const classes = useStyles();
    const { step, showRegister } = useBuyFlow(({ step, showRegister }) => ({
        step,
        showRegister,
    }));

    return (
        <Breadcrumbs
            separator={<div className={clsx(classes.separator)} />}
            className={clsx(classes.root, { [classes.smDowmHide]: smDowmHide }, { [classes.smUpHide]: smUpHide })}
        >
            {steps.reduce((items, item, key) => {
                if (!showRegister && key === 1) return items;
                return [
                    ...items,
                    <div className={clsx({ [classes.active]: step === key }, classes.breadcrumbContainer)} key={key}>
                        <Hidden smDown implementation="css">
                            <img
                                className={clsx(classes.icon, { [classes.active]: step === key, [classes.visited]: step >= key })}
                                width={24}
                                height={24}
                                src={item.icon}
                            />
                        </Hidden>
                        <Typography variant="caption" className={clsx({ [classes.active]: step === key, [classes.visited]: step >= key })}>
                            {item.label}
                        </Typography>
                    </div>,
                ];
            }, [])}
        </Breadcrumbs>
    );
});
