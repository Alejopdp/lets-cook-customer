import React from "react";
import PropTypes from "prop-types";
import { useLang } from "@hooks";

export interface IFilter {
    label: string;
    value: string;
    isEqual?: (value: number | string) => boolean;
    isEqualToFilterValue: (value: string) => boolean;
}

interface IFilterOptions {
    title: string;
    items: IFilter[];
}

export const useRecipesFilters = () => {
    const [lang] = useLang("buyFlowLayout");

    const _filterOptions: IFilterOptions[] = [
        {
            title: lang.difficultLevel,
            items: [
                {
                    label: lang.itemEasy,
                    value: "Facil",
                    isEqual: (recipeDifficultLevel) => recipeDifficultLevel === "Facil",
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === "Facil",
                },
                {
                    label: lang.itemMedium,
                    value: "Media",
                    isEqual: (recipeDifficultLevel) => recipeDifficultLevel === "Media",
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === "Media",
                },
                {
                    label: lang.itemHard,
                    value: "Dificil",
                    isEqual: (recipeDifficultLevel) => recipeDifficultLevel === "Dificil",
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === "Dificil",
                },
            ],
        },
        {
            title: lang.timeOfCook,
            items: [
                {
                    label: lang.item15Min,
                    value: lang.item15Min,
                    isEqual: (recipeCookTime: number) => recipeCookTime < 15,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.item15Min,
                },
                {
                    label: lang.item15To30,
                    value: lang.item15To30,
                    isEqual: (recipeCookTime: number) => 15 <= recipeCookTime && recipeCookTime < 30,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.item15To30,
                },
                {
                    label: lang.item30To60,
                    value: lang.item30To60,
                    isEqual: (recipeCookTime: number) => 30 <= recipeCookTime && recipeCookTime < 60,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.item30To60,
                },
                {
                    label: lang.itemUpperTo60,
                    value: lang.itemUpperTo60,
                    isEqual: (recipeCookTime: number) => recipeCookTime >= 60,
                    isEqualToFilterValue: (anotherFilterValue: string) => anotherFilterValue === lang.itemUpperTo60,
                },
            ],
        },
    ];

    return [_filterOptions];
};

// export default useRecipesFilters;
