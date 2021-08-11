// import clsx from "clsx";
import React, { useMemo, useState } from 'react'
import { Layout } from "@layouts";
import BonoRegaloLanding from './bonoRegaloLanding';
import { RegisterUserStep } from "@organisms";
import CheckoutBonoRegalo from './checkoutBonoRegalo';
import PurchaseConfirmationBonoRegalo from './purchaseConfirmationBonoRegalo'

/**
 * TODO: IMPORTANT!!! is needly add all values to container, the idea is go to controlling the spaces o margins for the differents sections.
 */

const BonoRegalo = () => {
    const [step, setStep] = useState(1);

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

    const steps = useMemo(
        () => [
            <BonoRegaloLanding />,
            <RegisterUserStep />,
            <CheckoutBonoRegalo />,
            <PurchaseConfirmationBonoRegalo />,
        ],
        []
    );

    return (
        <Layout seoTitle="Bono regalo - Let's cook: Productos frescos y recetas" disableCallToActionSection disableFooterSection={step === 0 ? false : true}>
            {steps[step]}
        </Layout>
    );
};

export default BonoRegalo;
