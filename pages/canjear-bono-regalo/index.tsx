// import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { Layout } from "@layouts";
import ExchangeBonoRegaloLanding from "../../components/organisms/exchangeBonoRegaloLanding";
import { RegisterUserStep, RecipeChoiseStep } from "@organisms";
import CheckoutBonoRegalo from "../../components/organisms/checkoutBonoRegaloCanjear";

/**
 * TODO: IMPORTANT!!! is needly add all values to container, the idea is go to controlling the spaces o margins for the differents sections.
 */

const BonoRegalo = () => {
    const [step, setStep] = useState(0);

    const steps = useMemo(
        () => [<ExchangeBonoRegaloLanding />, <RegisterUserStep />, <CheckoutBonoRegalo />, <RecipeChoiseStep recipes={[]} />],
        []
    );

    return (
        <Layout
            seoTitle="Canjear bono regalo - LetsCook: Productos frescos y recetas"
            seoOgUrlSlug="canjear-bono-regalo"
            disableCallToActionSection
            disableFooterSection={step === 0 ? false : true}
            page="canjear bono regalo"
        >
            <div style={{ paddingTop: "48px" }}>{steps[step]}</div>
        </Layout>
    );
};

export default BonoRegalo;
