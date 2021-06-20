import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Layout from '../../layout';
import ValuePropositionSection from '../sections/ValuePropositionSection';
import BenefitsSection from '../sections/BenefitsSection';
import CallToActionSection from '../sections/CallToActionSection';
import GoogleRatingSection from '../sections/GoogleRatingSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import PlansSection from '../sections/PlansSection';
import RecipesSection from '../sections/RecipesSection';
import ReviewsSection from '../sections/ReviewsSection.jsx'

const useStyles = makeStyles(theme => ({
    // root: {
    //     top: 0,
    //     position: "absolute",
    //     display: 'flex',
    //     flexDirection: "column"
    // },
    paddingY8: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    paddingX8: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
    }
}));
/**
 * TODO: IMPORTANT!!! is needly add all values to container, the idea is go to controlling the spaces o margins for the differents sections.
 */
const HomePage = () => {
    const classes = useStyles();
    return (
        <Layout>
            <ValuePropositionSection />
            <div style={{ paddingTop: '32px' }}>
                <GoogleRatingSection />
            </div>
            <div className={classes.paddingY8}>
                <HowItWorksSection />
            </div>
            <div className={classes.paddingY8}>
                <PlansSection />
            </div>
            <div>
                <BenefitsSection />
            </div>
            <div className={classes.paddingY8}>
                <RecipesSection 
                 title="Hecha un vistazo a las recetas de esta semana"
                 subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
                 titleAlign="flex-start"
                />
            </div>
            <div className={classes.paddingY8}>
                <ReviewsSection />
            </div>
        </Layout>
    )
}

export default HomePage;