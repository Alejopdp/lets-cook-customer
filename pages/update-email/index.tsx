import React from "react";
import { Layout } from "components/layout";
import { useRouter } from "next";
import { updateEmail } from "helpers/serverRequests/customer";
import Typography from "@material-ui/core/Typography";

const UpdateEmailPage = (props) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const sendTokenForUpdatingTheEmail = async () => {
            const res = await updateEmail(router.query.token ?? "", "");

            if (res && res.status === 200) {
                setShowMessage(true);
            } else {
                setError(res?.data?.message ?? "Ocurrió un error inesperado, por favor intente nuevamente");
            }
        };
    }, []);

    return (
        <Layout
            page="Update email"
            seoTitle={`Update email - Let's cook`}
            seoDescriptionContent="Update email"
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/update-email?token=${router.query.token}`}
            children={undefined}
        >
            <div>{!showMessage ? <>Loading</> : <Typography>{error ?? "Has cambiado tu correo con éxito"}</Typography>}</div>
        </Layout>
    );
};

UpdateEmailPage.propTypes = {};

export default UpdateEmailPage;
