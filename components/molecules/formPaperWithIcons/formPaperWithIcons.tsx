// Utils & config
import React from "react";
import useStyles from "./styles";
import { FormPaperWithIconsProps } from "./interfaces";
import clsx from "clsx";

// External components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import { Button, Grid } from "@material-ui/core";

// Icons & Images
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export const FormPaperWithIcons = (props: FormPaperWithIconsProps) => {

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

export default FormPaperWithIcons;
