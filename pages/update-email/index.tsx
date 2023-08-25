import React, { useEffect, useState } from "react";
import { Layout } from "components/layout";
import { useRouter } from "next/router";
import { getCustomerById, updateEmail } from "helpers/serverRequests/customer";
import Typography from "@material-ui/core/Typography";
import { useAuthStore, useUserInfoStore } from "@stores";
import { useLang, useLocalStorage } from "@hooks";
import InnerSectionLayout from "components/layout/innerSectionLayout";
import { Grid } from "@material-ui/core";
import Spinner from "@material-ui/core/CircularProgress";

const UpdateEmailPage = (props) => {
    const router = useRouter();
    const [lang] = useLang("updateEmail");
    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const { userInfo, setuserInfo } = useUserInfoStore();
    const { isAuthenticated } = useAuthStore();
    const { saveInLocalStorage } = useLocalStorage();

    useEffect(() => {
        const sendTokenForUpdatingTheEmail = async () => {
            const res = await updateEmail((router.query.token as string) ?? "", "");

            if (res && res.status === 200) {
                if (isAuthenticated) {
                    const customerInfoRes = await getCustomerById(res.data.id, router.locale);

                    if (customerInfoRes && customerInfoRes.status === 200) {
                        const newUserInfo = {
                            email: customerInfoRes.data.email,
                            phone1: customerInfoRes.data.phone1,
                            phone2: customerInfoRes.data.phone2,
                            paymentMethods: customerInfoRes.data.paymentMethods,
                            preferredLanguage: customerInfoRes.data.preferredLanguage,
                            firstName: customerInfoRes.data.firstName,
                            lastName: customerInfoRes.data.lastName,
                            id: customerInfoRes.data.id,
                            shippingAddress: customerInfoRes.data.shippingAddress,
                            fullName: customerInfoRes.data.fullName,
                            permissions: [],
                            roleTitle: "customer",
                            wallet: customerInfoRes.data.wallet,
                        };

                        setuserInfo(newUserInfo);
                        saveInLocalStorage("userInfo", newUserInfo);
                    }
                }
            } else {
                setError(res?.data?.message ?? "Ocurrió un error inesperado, por favor intente nuevamente");
            }
            setShowMessage(true);
        };

        if (router.query && router.query.token) sendTokenForUpdatingTheEmail();
    }, [router.query]);

    return (
        <Layout
            page="Update email"
            seoTitle={`Update email - Let's cook`}
            seoDescriptionContent="Update email"
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/update-email?token=${router.query.token}`}
            disableCallToActionSection
        >
            <InnerSectionLayout>
                <Grid container>
                    <Grid item style={{ margin: "auto" }}>
                        {!showMessage ? <Spinner /> : <Typography>{error || lang.success}</Typography>}
                    </Grid>
                </Grid>
            </InnerSectionLayout>
        </Layout>
    );
};

UpdateEmailPage.propTypes = {};

export default UpdateEmailPage;
