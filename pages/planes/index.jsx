const PlansIndexPage = () => {
    return <></>;
};
export async function getServerSideProps({ locale, query, previewData }) {
    const defaultPlan = "plan-familiar";
    const defaultPeopleQty = 2;
    const defaultRecipesQty = 2;

    return {
        redirect: {
            destination: `/planes/${defaultPlan}?personas=${defaultPeopleQty}&recetas=${defaultRecipesQty}`,
            permanent: true,
        },
    };
}
export default PlansIndexPage;
