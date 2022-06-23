// import clsx from "clsx";
import ValuePropositionSection from "../sections/ValuePropositionSection";
import BenefitsSection from "../sections/BenefitsSection";
import GoogleRatingSection from "../sections/GoogleRatingSection";
import HowItWorksSection from "../sections/HowItWorksSection";
import PlansSection from "../sections/PlansSection";
import RecipesSection from "../sections/RecipesSection";
import ReviewsSection from "../sections/ReviewsSection";

import styles from "./styles.module.scss";
import { HomePageProps } from "./interfaces";
import { useLang } from "@hooks";

const HomePage = (props: HomePageProps) => {
    const [lang] = useLang("home");

    return (
        <>
            <ValuePropositionSection lang={lang.valuePropositionSection} />
            <div className={styles.paddingTop32}>
                <GoogleRatingSection />
            </div>
            <div className={styles.paddingY8}>
                <HowItWorksSection lang={lang.howItWorksSection} />
            </div>
            <div className={styles.paddingY8}>
                <PlansSection cards={props.plans} lang={lang.plansSection} />
            </div>
            <div>
                <BenefitsSection lang={lang.benefitsSection} />
            </div>
            <div className={styles.paddingY8}>
                <RecipesSection recipes={props.recipes} lang={lang.recipesSection} />
            </div>
            <div className={styles.paddingY8}>
                <ReviewsSection />
            </div>
        </>
    );
};

export default HomePage;
