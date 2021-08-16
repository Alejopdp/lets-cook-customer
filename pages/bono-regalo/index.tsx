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
    const [step, setStep] = useState(0);

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
        <Layout seoTitle="Bono regalo - Let's cook: Productos frescos y recetas" seoOgUrlSlug='bono-regalo' disableCallToActionSection disableFooterSection={step === 0 ? false : true}>
            <div style={{ paddingTop: '48px' }}>
                {steps[step]}
            </div>
        </Layout>
    );
};

export default BonoRegalo;
