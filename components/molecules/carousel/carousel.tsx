import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { IconButton } from "@material-ui/core/";

const useStyles = makeStyles((theme: Theme) => ({
    item: {
        paddingLeft: "20px",
        paddingRight: "20px",
        zIndex: 1,
    },

    dotActive: {
        color: theme.palette.primary.main,
        cursor: "pointer",
        fontSize: 15,
    },
    dotInactive: {
        color: "grey",
        cursor: "pointer",
        fontSize: 15,
        opacity: 0.7,
    },
    forwardArrow: {
        position: "absolute",
        zIndex: 5,
        right: 0,
        marginRight: 8,
        backgroundColor: 'rgba(255,255,255,0.8)',
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,1)',
        }
    },
    backArrow: {
        position: "absolute",
        zIndex: 5,
        left: 0,
        marginLeft: 8,
        backgroundColor: 'rgba(255,255,255,0.8)',
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,1)',
        }
    },
    container: {
        width: "100%",
        paddingTop: "20px",
        paddingBottom: "20px",
    },
}));

interface CarouselComponentProps {
    maxItemsMobile: number;
    maxItemsTablet: number;
    maxItemsDesktop: number;
    components: { item: any; component: JSX.Element }[];
    dotsNotShowed?: boolean;
}

export default function CarouselComponent(props: CarouselComponentProps) {
    const classes = useStyles();

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: props.maxItemsDesktop ? props.maxItemsDesktop : 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: props.maxItemsTablet ? props.maxItemsTablet : 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: props.maxItemsMobile ? props.maxItemsMobile : 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    const CustomDot = ({ onClick, ...rest }) => {
        const {
            active,
            carouselState: { currentSlide, deviceType },
        } = rest;
        if (active) {
            return <FiberManualRecordIcon onClick={() => onClick()} className={classes.dotActive} style={{ fontSize: 8 }} />;
        }
        return <FiberManualRecordIcon onClick={() => onClick()} className={classes.dotInactive} style={{ fontSize: 8 }} />;
    };

    const CustomRightArrow = ({ onClick }) => {
        return (
            <IconButton className={classes.forwardArrow} onClick={() => onClick()}>
                <ArrowForwardIosIcon />
            </IconButton>
        );
    };
    const CustomLeftArrow = ({ onClick }) => {
        return (
            <IconButton className={classes.backArrow} onClick={() => onClick()}>
                <ArrowBackIosIcon />
            </IconButton>
        );
    };

    return (
        <div style={{ position: "relative", paddingBottom: "20px" }}>
            <Carousel
                swipeable={true}
                draggable={false}
                showDots={props.dotsNotShowed ? false : true}
                renderDotsOutside={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                keyBoardControl={true}
                containerClass={classes.container}
                removeArrowOnDeviceType={["mobile"]}
                customDot={<CustomDot onClick={onclick} />}
                customLeftArrow={<CustomLeftArrow onClick={onclick} />}
                customRightArrow={<CustomRightArrow onClick={onclick} />}
                itemClass={classes.item}
            >
                {props.components.map((component) => {
                    return component.component;
                })}
            </Carousel>
        </div>
    );
}
