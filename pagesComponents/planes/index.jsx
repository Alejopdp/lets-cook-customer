import { memo } from "react";
const PlansIndexPage = () => {
    return <></>;
};

export async function getServerSideProps({ locale, previewData }) {
    const defaultPlan = "plan-familiar";
    const defaultPeopleQty = 0;
    const defaultRecipesQty = 0;

    return {
        redirect: {
            destination: `/${locale}/planes/${defaultPlan}?personas=${defaultPeopleQty}&recetas=${defaultRecipesQty}`,
            permanent: false,
        },
    };
}
export default memo(PlansIndexPage);
