// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").comoFunciona;
import { useTheme } from "@material-ui/core";

// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import HowItWorksExtendedSection from "../../components/organisms/howItWorksExtendedSection/howItWorksExtendedSection";
import BenefitsSection from "../../components/organisms/sections/BenefitsSection";
import { Layout } from "../../components/layout/index";

const ComoFunciona = () => {
    const router = useRouter();
    const lang = langs[router.locale];
    const theme = useTheme();

    const benefits = [
        {
            title: "Economiza tu tiempo",
            content: "Sabemos que no está en nuestras manos parar el ritmo la sociedad en el que vivimos, pero si aportar una solución con la que podamos sacar momentos para cuidarnos día a día.",
            image: "/assets/home/save-time.svg",
        },
        {
            title: "Come saludable y variado",
            content: "Queremos cuidarte en todo sentido, por eso seleccionamos cuidadosamente los ingredientes de tus recetas frescos y de proximidad y te sorprendemos cada semana con recetas variadas.",
            image: "/assets/home/healthy-food.svg",
        },
        {
            title: "Combate el foodwaste",
            content: "¡La comida no se tira! En Let’s Cook seleccionamos la cantidad de ingredientes exacta para que no queden excedentes, pero somos generosos con la ración para los más hambrientos.",
            image: "/assets/home/foodwaste.svg",
        }
    ];

    return (
        <Layout seoTitle="Cómo funciona - Let's cook: Productos frescos y recetas" seoOgUrlSlug='como-funciona' page='como funciona'>
            <InnerSectionLayout containerMaxWidth="lg">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <HowItWorksExtendedSection />
            </InnerSectionLayout>
            <BenefitsSection backgroundColor={theme.palette.background.default} cards={benefits} removeCallToAction enableTitleSection />
        </Layout>
    );
};



export default ComoFunciona;
