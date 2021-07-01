import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Box, makeStyles } from "@material-ui/core";

export default function SimpleRating({ handleClickOpenRecipeModal, isModal, fullScreen }) {
    const [value, setValue] = React.useState(0);

    return (
        <div>
            <Box
                component="fieldset"
                mb={-2}
                mt={fullScreen ? 2 : isModal ? 1 : -1}
                borderColor="transparent"
                style={{ display: isModal ? "flex" : null, justifyContent: isModal ? "center" : null }}
            >
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onClick={handleClickOpenRecipeModal}
                    size="large"
                    style = {{marginLeft: '-.8rem'}}
                />
            </Box>
        </div>
    );
}
