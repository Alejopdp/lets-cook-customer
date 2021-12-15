import React from "react";
import PropTypes from "prop-types";
import { Layout } from "@layouts";
import { useLang } from "@hooks";

const Custom404Page = (props) => {
    const [lang] = useLang("errorPage");

    return (
        <Layout seoTitle="Página no encontrada" seoOgUrlSlug="404" disableCallToActionSection disableFooterSection={false} page="error 404">
            <h1 style={{ margin: "auto" }}>{lang.notFoundError}</h1>
        </Layout>
    );
};

Custom404Page.propTypes = {};

export default Custom404Page;
