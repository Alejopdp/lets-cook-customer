// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Typography from "@material-ui/core/Typography";
import RateReviewIcon from "@material-ui/icons/RateReview";
import Link from "@material-ui/core/Link";

// Internal Components

const useStyles = makeStyles((theme) => ({}));

const MoveAbroad = (props) => {
    const lang = props.lang;
    const theme = useTheme();

    const googleReviewLink = "https://g.page/r/CWbmYA4fuxLDEAg/review";

    return (
        <>
            <Typography variant="body2" color="textPrimary" style={{ fontSize: "16px", marginBottom: theme.spacing(3) }}>
                {lang.modalText}
            </Typography>
            <Link
                href={googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                color="textPrimary"
                style={{ cursor: "pointer", textDecoration: "none" }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <RateReviewIcon />
                    <Typography variant="subtitle1" color="textPrimary" style={{ fontSize: "16px", marginLeft: theme.spacing(1) }}>
                        {lang.reviewText}
                    </Typography>
                </div>
            </Link>
        </>
    );
};

export default MoveAbroad;
