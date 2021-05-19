import { makeStyles, Typography } from '@material-ui/core';

import Layout from '../../layout';
import ValuePropositionSection from '../sections/ValuePropositionSection';
import BenefitsSection from '../sections/BenefitsSection';
import CallToActionSection from '../sections/CallToActionSection';
import GoogleRatingSection from '../sections/GoogleRatingSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import PlansSection from '../sections/PlansSection';
import ReceiptsSection from '../sections/ReceiptsSection';
import Footer from '../../molecules/footer/footer';
const useStyles = makeStyles(theme => ({
    root: { top: 0, position:"absolute", display: 'flex', flexDirection: "column"}
}));
const HomePage = () => {
    const classes = useStyles();
    return <Layout>
        <div className={classes.root}>
        <ValuePropositionSection />
        <BenefitsSection />
        <CallToActionSection />
        <GoogleRatingSection />
        <HowItWorksSection />
        <PlansSection />
        <ReceiptsSection />
        <Footer/>
        </div>
    </Layout>
}

export default HomePage;