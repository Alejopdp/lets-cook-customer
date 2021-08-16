import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    divContainer: {
        marginTop: '-350px',
        [theme.breakpoints.down('lg')]: {
            marginTop: '-250px'
        },
        [theme.breakpoints.down('md')]: {
            marginTop: '-175px'
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '-80px'
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '24px'
        },
    }
}));