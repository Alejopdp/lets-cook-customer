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
import Footer from '../../molecules/footer/footer';
const useStyles = makeStyles(theme => ({
    root: {
        top: 0,
        position: "absolute",
        display: 'flex',
        flexDirection: "column"
    },
    paddingY6: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6)
    },
    paddingX6: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
    }
}));
/**
 * TODO: IMPORTANT!!! is needly add all values to container, the idea is go to controlling the spaces o margins for the differents sections.
 */
const HomePage = () => {
    const classes = useStyles();
    return (
        <Layout>
            <div className={classes.root}>
                <ValuePropositionSection />
                <GoogleRatingSection />
                <div className={classes.paddingY6}>
                    <HowItWorksSection />
                </div>
                <div className={classes.paddingY6}>
                    <PlansSection />
                </div>
                <div className={clsx(classes.paddingX6, classes.paddingY6)}>
                    <BenefitsSection />
                </div>
                <div>
                    <RecipesSection />
                </div>

                <CallToActionSection />
                {/* TODO REMOVE TO PUT MAILER PLUGIN */}
                <div style={{
                    width: "100%",
                    height: 54,
                    backgroundColor: "rgba(0, 130, 71,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    TODO: Put here the mailer plugin
            </div>
                <Footer />
            </div>
        </Layout>
    )
}

export default HomePage;