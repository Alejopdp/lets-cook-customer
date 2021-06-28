import React from "react";
import { useRouter } from "next/router";

import Recipes from "../../components/organisms/recipes/recipes";

const RecetasLayout = () => {
    const router = useRouter();
    const {id} = router.query;
    return <Recipes id = {id} />;
};

export default RecetasLayout;
