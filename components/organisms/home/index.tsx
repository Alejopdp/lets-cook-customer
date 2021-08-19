// import clsx from "clsx";
import { Layout } from "@layouts";
import ValuePropositionSection from "../sections/ValuePropositionSection";
import BenefitsSection from "../sections/BenefitsSection";
// import CallToActionSection from "../sections/CallToActionSection";
import GoogleRatingSection from "../sections/GoogleRatingSection";
import HowItWorksSection from "../sections/HowItWorksSection";
import PlansSection from "../sections/PlansSection";
import RecipesSection from "../sections/RecipesSection";
import ReviewsSection from "../sections/ReviewsSection";

import { useStyles } from "./styles";
import { HomePageProps } from "./interfaces";
/**
 * TODO: IMPORTANT!!! is needly add all values to container, the idea is go to controlling the spaces o margins for the differents sections.
 */
const HomePage = (props: HomePageProps) => {
    const classes = useStyles();
    return (
        <Layout>
            <ValuePropositionSection />
            <div style={{ paddingTop: "32px" }}>
                <GoogleRatingSection />
            </div>
            <div className={classes.paddingY8}>
                <HowItWorksSection cards={props.howItWorks} />
            </div>
            <div className={classes.paddingY8}>
                <PlansSection cards={props.plans} />
            </div>
            <div>
                <BenefitsSection cards={props.benefits} />
            </div>
            <div className={classes.paddingY8}>
                <RecipesSection recipes={props.recipes} />
            </div>
            <div className={classes.paddingY8}>
                <ReviewsSection />
            </div>
        </Layout>
    );
};

export default HomePage;
