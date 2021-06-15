// Utils & Config
import React from "react";
import { getRecipes } from "../../helpers/serverRequests/recipe";

// Internal Components
import InnerSectionLayout from "../../components/layout/publicLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import RecipesGrid from "../../components/organisms/recipesGrid/recipesGrid";

const Recetas = (props) => {
    return (
        <InnerSectionLayout containerMaxWidth="lg">
            <TitleOtherPages title={"El pago ha sido exitoso ¡Muchas gracias por tu compra!"} subtitle={"Elige las 3 recetas que recibirás el martes 18"} />
            <RecipesGrid recipesSelection recipes={props.recipes} />
        </InnerSectionLayout>
    );
};

export async function getStaticProps(context) {
    const res = await getRecipes(context.locale);

    return {
        props: {
            recipes: res.status === 200 ? res.data : [],
        },
    };
}

export default Recetas;
