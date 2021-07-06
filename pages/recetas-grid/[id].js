import React, { useEffect } from "react";
import { useRouter } from "next/router";


import Recipes from "../../components/organisms/recipes/recipes";
import InnerSectionLayout from "../../components/layout/publicLayout";
import Layout from '../../components/layout/index';
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import { getRecipesByCustomer } from "../../helpers/serverRequests/user-recipes";

export async function getStaticPaths() {
    return {
      paths: [
        { params: { id: "test"} } 
      ],
      fallback: false
    };
  }

  export const getStaticProps = async (context) => {
    const test = context.params.id
    const res = await getRecipesByCustomer(test, context.locale);

    return {
        props: {
            recipes: res.data || null,
            error: res.status !== 200 ? "ERROR" : "",
        },
    };
};


const RecetasLayout = ({recipes}) => {
    const router = useRouter();
    const { id } = router.query;


    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/" title="Valorar recetas" />
                <Recipes recipes = {recipes}/>
            </InnerSectionLayout>
        </Layout>

    )
};



export default RecetasLayout;
