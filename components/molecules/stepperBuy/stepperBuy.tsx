import { memo, useMemo } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Typography, Breadcrumbs, Hidden } from "@material-ui/core";
import { useBuyFlow } from "@stores";
import useStyles from "./styles";
import InfoIcon from "@material-ui/icons/Help";
import LightTooltip from "components/atoms/lightTooltip/lightTooltip";
interface StepperBuyProps {
    steps: {
        icon: string;
        label: string;
    }[];
    smUpHide?: boolean;
    smDowmHide?: boolean;
}

const disabledChooseIconRoute = "/icons/appbar/img-header-select-recipes-disabled.svg";

export const StepperBuy = memo(({ steps, smUpHide, smDowmHide }: StepperBuyProps) => {
    const classes = useStyles();
    const { step, showRegister, canChooseRecipes } = useBuyFlow(({ step, showRegister, form }) => ({
        step,
        showRegister,
        canChooseRecipes: form.canChooseRecipes,
    }));

    // const disableChooseRecipeStep = useMemo(() => {
    //     return !canChooseRecipes && key === steps.length - 1;
    // }, [canChooseRecipes]);

    return (
        <Breadcrumbs
            separator={<div className={clsx(classes.separator)} />}
            className={clsx(classes.root, { [classes.smDowmHide]: smDowmHide }, { [classes.smUpHide]: smUpHide })}
        >
            {steps.reduce((items, item, key) => {
                // if (!showRegister && key === 1) return items;
                return [
                    ...items,
                    <div className={clsx({ [classes.active]: step === key }, classes.breadcrumbContainer)} key={key}>
                        <Hidden smDown implementation="css">
                            <img
                                className={clsx(classes.icon, { [classes.active]: step === key, [classes.visited]: step >= key })}
                                width={24}
                                height={24}
                                src={!canChooseRecipes && key === steps.length - 1 ? disabledChooseIconRoute : item.icon}
                            />
                        </Hidden>
                        <Typography
                            variant="caption"
                            className={clsx({ [classes.active]: step === key, [classes.visited]: step >= key })}
                            style={{ color: !canChooseRecipes && key === steps.length - 1 ? "#cccccc" : "inherit" }}
                        >
                            {item.label}
                        </Typography>
                        {!canChooseRecipes && key === steps.length - 1 && (
                            <LightTooltip text="El plan seleccionado no permite la selección de recetas. Te enviaremos las recetas más elegidas de la semana. Cada semana cambiamos las recetas.">
                                <InfoIcon style={{ color: "#FD4A4A", fontSize: 16, marginLeft: 16 }} />
                            </LightTooltip>
                        )}
                    </div>,
                ];
            }, [])}
        </Breadcrumbs>
    );
});
