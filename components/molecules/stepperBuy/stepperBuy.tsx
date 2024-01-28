import { memo } from "react";
import clsx from "clsx";
import { Typography, Breadcrumbs, Hidden } from "@material-ui/core";
import { useBuyFlow } from "@stores";
import useStyles from "./styles";
import InfoIcon from "@material-ui/icons/Help";
import LightTooltip from "components/atoms/lightTooltip/lightTooltip";
import { useLang } from "@hooks";
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
    const [lang] = useLang("stepperBuy");
    const { step, canChooseRecipes } = useBuyFlow(({ step, showRegister, form }) => ({
        step,
        showRegister,
        canChooseRecipes: form.canChooseRecipes,
    }));

    return (
        <Breadcrumbs
            separator={<div className={clsx(classes.separator)} />}
            className={clsx(classes.root, { [classes.smDowmHide]: smDowmHide }, { [classes.smUpHide]: smUpHide })}
        >
            {steps.reduce((items, item, key) => {
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
                            className={clsx({
                                [classes.active]: step === key,
                                [classes["text-visited"]]: step >= key,
                                [classes.cantChooseRecipes]: !canChooseRecipes && key === steps.length - 1,
                            })}
                        >
                            {item.label}
                        </Typography>
                        {!canChooseRecipes && key === steps.length - 1 && (
                            <LightTooltip text={lang.tooltip}>
                                <InfoIcon style={{ color: "#FD4A4A", fontSize: 16, marginLeft: 16 }} />
                            </LightTooltip>
                        )}
                    </div>,
                ];
            }, [])}
        </Breadcrumbs>
    );
});
