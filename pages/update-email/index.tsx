import React, { useEffect, useState } from "react";
import { Layout } from "components/layout";
import { useRouter } from "next/router";
import { updateEmail } from "helpers/serverRequests/customer";
import Typography from "@material-ui/core/Typography";
import { useUserInfoStore } from "@stores";
import { useLang, useLocalStorage } from "@hooks";
import InnerSectionLayout from "components/layout/innerSectionLayout";
import { Grid } from "@material-ui/core";

const UpdateEmailPage = (props) => {
    const router = useRouter();
    const [lang] = useLang("updateEmail");
    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const { userInfo, setuserInfo } = useUserInfoStore();
    const { saveInLocalStorage } = useLocalStorage();

    useEffect(() => {
        const sendTokenForUpdatingTheEmail = async () => {
            const res = await updateEmail((router.query.token as string) ?? "", "");

            if (res && res.status === 200) {
                const newUserInfo = { ...userInfo, email: res.data.email };
                setuserInfo(newUserInfo);
                saveInLocalStorage("userInfo", newUserInfo);
            } else {
                console.log("Res data: ", res.data);
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
                        {!showMessage ? <>Loading</> : <Typography>{error || lang.success}</Typography>}
                    </Grid>
                </Grid>
            </InnerSectionLayout>
        </Layout>
    );
};

UpdateEmailPage.propTypes = {};

export default UpdateEmailPage;
