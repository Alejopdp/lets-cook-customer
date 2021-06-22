// Utils & config
import React from "react";
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import { Button, Grid } from "@material-ui/core";

// Icons & Images
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const FormPaperWithIcons = (props) => {
    const { paper, title, alignIcons, titleMargin } = useStyles();

    return (
        <Paper className={paper}>
            <Grid item container justify="space-between" alignItems="center">
                <Grid item className={title}>
                    {props.initialIcon &&
                        <Image src={props.initialIcon} height={40} width={40} />
                    }

                    <Typography variant="h6" color="textSecondary" className={titleMargin}>
                        {props.title}
                    </Typography>
                </Grid>

                {props.finalIcons &&
                    <Grid item className={alignIcons}>
                        <Button onClick={props.onClick}>
                            <EditIcon fontSize="large" />
                        </Button>

                        <CheckCircleIcon fontSize="large" color="primary" />
                    </Grid>
                }
            </Grid>

            {props.children}
        </Paper>
    );
};

FormPaperWithIcons.propTypes = {
    initialIcon: PropTypes.string,
    title: PropTypes.string.isRequired,
    finalIcons: PropTypes.bool,
    onClick: PropTypes.func,
};

export default FormPaperWithIcons;
