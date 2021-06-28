const PlansIndexPage = () => {
    return <></>;
};

export async function getServerSideProps({ locale, previewData }) {
    const defaultPlan = "default-plan";
    const defaultPeopleQty = 2;
    const defaultRecipesQty = 2;

    return {
        redirect: {
            destination: `/${locale}/planes/${defaultPlan}?personas=${defaultPeopleQty}&recetas=${defaultRecipesQty}`,
            permanent: true,
        },
    };
}
export default PlansIndexPage;
