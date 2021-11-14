import React, { useEffect } from "react";
import HomePage from "../components/organisms/home";

import { HomePageProps } from "components/organisms/home/interfaces";
import { getPlans, getRecipes } from "@helpers";

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
            errors,
        },
    };
}

