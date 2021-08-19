import React from 'react';
import ExchangeBonoRegaloValueProp from "./exchangeBonoRegaloValueProp";
import ExchangeBonoRegaloCodeInput from "./exchangeBonoRegaloCodeInput";
import ReviewsSection from "../../../components/organisms/sections/ReviewsSection";
import { useStyles } from './styles';
import FaqsSection from '../../../components/molecules/faqsSection';
import HowItWorksSubsection from '../../../components/molecules/howItWorksSubsection/HowItWorksSubsection';

/**
 * TODO: IMPORTANT!!! is needly add all values to container, the idea is go to controlling the spaces o margins for the differents sections.
 */

const ExchangeBonoRegaloLanding = () => {
    const classes = useStyles();

    const howItWorks = [
        {
            title: "Lorem Ipsum dolor",
            content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
            image: "unnamed.jpg",
        },
        {
            title: "Lorem Ipsum dolor",
            content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
            image: "unnamed.jpg",
        },
        {
            title: "Lorem Ipsum dolor",
            content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
            image: "unnamed.jpg",
        },
        {
            title: "Lorem Ipsum dolor",
            content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
            image: "unnamed.jpg",
        },
    ]

    const faqs = [
        {
            question: "Ipsum lorem dolor sit amet sadipscing elitr?",
            answer: "Ipsum lorem dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
        },
        {
            question: "Ipsum lorem dolor sit amet sadipscing elitr?",
            answer: "Ipsum lorem dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
        },
        {
            question: "Ipsum lorem dolor sit amet sadipscing elitr?",
            answer: "Ipsum lorem dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
        },
        {
            question: "Ipsum lorem dolor sit amet sadipscing elitr?",
            answer: "Ipsum lorem dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
        },
    ]


    return (
        <>
            <ExchangeBonoRegaloValueProp />
            <ExchangeBonoRegaloCodeInput />
            <div className={classes.paddingY8}>
                <HowItWorksSubsection cards={howItWorks} />
            </div>
            <div className={classes.paddingY8}>
                <FaqsSection faqs={faqs} />
            </div>
            <div className={classes.paddingY8}>
                <ReviewsSection />
            </div>
        </>
    );
};

export default ExchangeBonoRegaloLanding;