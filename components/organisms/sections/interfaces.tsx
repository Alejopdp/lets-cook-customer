import { Plan, Recipe } from "@helpers";
import { Review } from "@helpers";

export interface Benefit {
    title: string;
    content: string;
    image: string;
}
export interface BenefitsSectionProps {
    cards: Benefit[]
}

export interface CallToActionSectionProps { }
export interface GoogleRatingSectionProps { }

export interface HowItWorks {
    title: string;
    content: string;
    image: string;
}
export interface HowItWorksSectionProps {
    cards: HowItWorks[]
}
export interface PlansSectionProps {
    cards: Plan[]
}

export interface RecipesSectionProps {
    recipes?: Recipe[];
    title: string;
    subtitle: string;
    titleAlign: string;
}

export interface ReviewsSectionProps {
    reviews?: Review[]
}