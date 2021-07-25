// Utils & config
import React from "react";
import useStyles from "./styles";
import { FormPaperWithIconsProps } from "./interfaces";
import clsx from "clsx";
import { useTheme } from "@material-ui/core";


// External components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import { Button, Grid } from "@material-ui/core";

// Icons & Images
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export const FormPaperWithIcons = (props: FormPaperWithIconsProps) => {
    const theme = useTheme();
    const { paper, title, alignIcons, titleMargin } = useStyles();

    return (
        <Paper className={paper}>
            <Grid item container justify="space-between" alignItems="center" style={{ marginBottom: theme.spacing(3) }}>
                <Grid item className={title}>
                    {props.initialIcon &&
                        <Image src={props.initialIcon} height={32} width={32} />
                    }
                    <Typography variant="h6" color="textSecondary" className={titleMargin}>
                        {props.title}
                    </Typography>
                </Grid>

                {props.finalIcons &&
                    <Grid item className={alignIcons}>
                        <Button onClick={props.onClick}>
                            <EditIcon fontSize="medium" />
                        </Button>
                        <CheckCircleIcon fontSize="medium" color="primary" />
                    </Grid>
                }
            </Grid>
            {props.children}
        </Paper>
    );
};

export default FormPaperWithIcons;
