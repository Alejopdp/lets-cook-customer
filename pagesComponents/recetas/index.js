// Utils & Config
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getNextWeekRecipes } from "../../helpers/serverRequests/recipes";
const langs = require("../../lang").recetas;

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import RecipesGrid from "../../components/organisms/recipesGrid/recipesGrid";
import { Layout } from "../../components/layout/";

const Recetas = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];
    const [isLoading, setIsLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipes = async () => {
            const res = await getNextWeekRecipes(router.locale);

            if (res && res.status === 200) {
                setRecipes(res.data);
            } else {
                enqueueSnackbar(res && res.data ? res.data.message : "Ocurrió un error inesperado, intente nuevamente");
            }
        };

        getRecipes();
    }, []);

    return (
        <Layout seoTitle="Recetas - Let's cook: Productos frescos y recetas" seoOgUrlSlug="recetas" page="recetas">
            <InnerSectionLayout containerMaxWidth="lg">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <RecipesGrid recipesPage recipes={recipes} />
            </InnerSectionLayout>
        </Layout>
    );
};
export default Recetas;

// export async function getServerSideProps(context) {
//     const res = await getNextWeekRecipes(context.locale);

//     return {
//         props: {
//             recipes: res.status === 200 ? res.data : [],
//         },
//     };
// }
