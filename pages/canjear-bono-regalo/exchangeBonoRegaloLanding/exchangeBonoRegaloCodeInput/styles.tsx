import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    divContainer: {
        marginTop: '-200px',
        [theme.breakpoints.down('lg')]: {
            marginTop: '-120px'
        },
        [theme.breakpoints.down('md')]: {
            marginTop: '-80px'
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '-40px'
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '24px'
        },
    }
}));