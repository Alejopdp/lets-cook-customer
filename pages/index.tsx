import React, { useEffect } from "react";
import HomePage from "../components/organisms/home";

import { HomePageProps } from "components/organisms/home/interfaces";
import { getPlans, getRecipes } from "@helpers";
import { Benefit, HowItWorks } from "components/organisms/sections/interfaces";

export default function Home(props: HomePageProps) {
    return (
        <div>
            <HomePage {...props} />
        </div>
    );
}

export async function getServerSideProps({ locale }) {
    const [_plans, _recipes] = await Promise.all([getPlans(locale), getRecipes(locale)]);

    const errors = [_plans.error, _recipes.error].filter((e) => !!e);

    if (errors.length) {
        console.warn("***-> Errors: ", errors);
    }

    return {
        props: {
            plans: _plans.data.plans || [],
            recipes: _recipes.data || [],
            howItWorks,
            benefits,
            errors,
        },
    };
}

const howItWorks: HowItWorks[] = [
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
];

const benefits: Benefit[] = [
    {
        title: "Productos frescos y de proximidad",
        content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
        image: "/assets/icon-test.svg",
    },
    {
        title: "Platos saludable y equilibrados",
        content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
        image: "/assets/icon-test.svg",
    },
    {
        title: "Nuevas recetas, todas las semanas",
        content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
        image: "/assets/icon-test.svg",
    },
    {
        title: "Cuidamos el medioambiente",
        content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
        image: "/assets/icon-test.svg",
    },
];
