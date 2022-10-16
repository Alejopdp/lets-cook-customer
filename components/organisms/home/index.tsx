// import clsx from "clsx";
import { Layout } from "@layouts";
import ValuePropositionSection from "../sections/ValuePropositionSection";
import BenefitsSection from "../sections/BenefitsSection";
import GoogleRatingSection from "../sections/GoogleRatingSection";
import HowItWorksSection from "../sections/HowItWorksSection";
import PlansSection from "../sections/PlansSection";
import RecipesSection from "../sections/RecipesSection";
import ReviewsSection from "../sections/ReviewsSection";

import { useStyles } from "./styles";
import { HomePageProps } from "./interfaces";
import { useLang } from "@hooks";

const HomePage = (props: HomePageProps) => {
    const classes = useStyles();
    const [lang] = useLang("home");

    return (
        <Layout page="homepage">
            <ValuePropositionSection lang={lang.valuePropositionSection} />
            <div style={{ paddingTop: "32px" }}>
                <GoogleRatingSection />
            </div>
            <div className={classes.paddingY8}>
                <HowItWorksSection lang={lang.howItWorksSection} />
            </div>
            <div className={classes.paddingY8}>
                <PlansSection cards={props.plans} lang={lang.plansSection} />
            </div>
            <div>
                <BenefitsSection lang={lang.benefitsSection} />
            </div>
            <div className={classes.paddingY8}>
                <RecipesSection recipes={props.recipes} lang={lang.recipesSection} />
            </div>
            <div className={classes.paddingY8}>
                <ReviewsSection reviews={props.reviews} />
            </div>
        </Layout>
    );
};

export default HomePage;
