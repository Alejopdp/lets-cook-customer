// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";

// External Components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

// Internal components

const lang = {
    es: { none: "Sin indicar" },
    en: { none: "None" },
    ca: { none: "Sense indicar" },
};
const DataDisplay = (props) => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Box style={props.style}>
            <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "14px", marginBottom: theme.spacing(1) }}>
                {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ fontSize: "16px", fontStyle: props.text ? "normal" : "italic" }}>
                {props.text || lang[router.locale].none}
            </Typography>
        </Box>
    );
};

export default DataDisplay;
