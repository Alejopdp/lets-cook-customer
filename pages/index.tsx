import React from "react";
import HomePage from "../components/organisms/home";

import { HomePageProps } from "components/organisms/home/interfaces";
import { Layout } from "@layouts";
import { getActualWeekRecipes, getPlans, getReviews } from "@helpers";

export default function Home(props: HomePageProps) {
    return (
        <Layout page="homepage">
            <HomePage {...props} />
        </Layout>
    );
}

export async function getServerSideProps({ locale }) {
    const [_plans, _recipes, _reviews] = await Promise.all([getPlans(locale), getActualWeekRecipes(locale), getReviews(locale)]);

    const errors = [_plans.error, _recipes.error, _reviews.error].filter((e) => !!e);

    if (errors.length) {
        console.warn("***-> Errors: ", errors);
    }

    return {
        props: {
            plans: _plans.data.plans || [],
            recipes: _recipes.data || [],
            //@ts-ignore
            reviews: _reviews.data || [],
            errors,
        },
    };
}
