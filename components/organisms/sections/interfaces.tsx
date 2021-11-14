import { Plan, Recipe } from "@helpers";
import { Review } from "@helpers";

export interface Benefit {
    title: string;
    content: string;
    image: string;
}
export interface BenefitsSectionProps {
    backgroundColor?: string,
    removeCallToAction?: boolean,
    enableTitleSection?: boolean,
    lang: any;
}

export interface CallToActionSectionProps {
    page?: string
}
export interface GoogleRatingSectionProps { }

export interface HowItWorks {
    title: string;
    content: string;
    image: string;
}
export interface HowItWorksSectionProps {
    lang: any;
}
export interface PlansSectionProps {
    cards: Plan[]
    lang: any;
}

export interface RecipesSectionProps {
    recipes?: Recipe[];
    lang: any;
}

export interface ReviewsSectionProps {
    reviews?: Review[]
}