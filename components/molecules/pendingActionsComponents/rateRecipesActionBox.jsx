// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components
import BoxWithIconAndTextButton from "../../../components/molecules/specificBox/boxWithIconAndTextButton";
import { useRouter } from "next/router";
import { localeRoutes, Routes } from "lang/routes/routes";
import { useUserInfoStore } from "@stores";

const RateRecipesActionBox = ({ lang }) => {
    const router = useRouter();
    const userInfo = useUserInfoStore((state) => state.userInfo);

    return (
        <BoxWithIconAndTextButton
            icon="rating"
            btnText={lang.btnText}
            handleClick={() => router.push({ pathname: `${localeRoutes[router.locale][Routes["valorar-recetas"]]}/${userInfo.id}` })}
        >
            <Typography variant="body2" style={{ fontSize: "16px" }}>
                {lang.text}
            </Typography>
        </BoxWithIconAndTextButton>
    );
};

export default RateRecipesActionBox;
