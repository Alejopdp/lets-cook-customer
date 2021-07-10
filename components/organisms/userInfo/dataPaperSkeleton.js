// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

// External component
import Skeleton from "@material-ui/lab/Skeleton";
import BoxWithTitleAndTextButton from "../../molecules/specificBox/boxWithTitleAndTextButton";

const DataPaperSkeleton = (props) => {
    const theme = useTheme();
    return (
        <BoxWithTitleAndTextButton title="Datos Personales" btnText="MODIFICAR DATOS PERSONALES" handleClick={() => ""}>
            <Skeleton variant="text" width="100%" height={21} style={{ marginBottom: theme.spacing(1) }} />
            <Skeleton variant="text" width="100%" height={22} style={{ marginBottom: theme.spacing(2) }} />
            <Skeleton variant="text" width="100%" height={21} style={{ marginBottom: theme.spacing(1) }} />
            <Skeleton variant="text" width="100%" height={22} style={{ marginBottom: theme.spacing(2) }} />
            <Skeleton variant="text" width="100%" height={21} style={{ marginBottom: theme.spacing(1) }} />
            <Skeleton variant="text" width="100%" height={22} style={{ marginBottom: theme.spacing(2) }} />
            <Skeleton variant="text" width="100%" height={21} style={{ marginBottom: theme.spacing(1) }} />
            <Skeleton variant="text" width="100%" height={22} style={{ marginBottom: theme.spacing(2) }} />
            <Skeleton variant="text" width="100%" height={21} style={{ marginBottom: theme.spacing(1) }} />
            <Skeleton variant="text" width="100%" height={22} />
        </BoxWithTitleAndTextButton>
    );
};

DataPaperSkeleton.propTypes = {};

export default DataPaperSkeleton;
