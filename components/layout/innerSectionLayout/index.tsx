import { memo } from "react";
import { useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const PublicLayout = (props) => {
    const theme = useTheme();
    return (
        <Container maxWidth={props.containerMaxWidth || "lg"}>
            <Grid container style={{
                paddingTop: theme.spacing(8),
                paddingBottom: theme.spacing(8)
            }}> {props.children} </Grid>
        </Container>
    );
};

export default  memo(PublicLayout);
