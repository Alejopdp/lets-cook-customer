import React, { useEffect, useState } from "react";

import Rating from "@material-ui/lab/Rating";
import { Box } from "@material-ui/core";

export default function SimpleRating({ handleClickOpenRecipeModal, isModal, fullScreen, selectedRecipe, starValue}) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (starValue === 0) setValue(0);
    }, [starValue]);

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
                    name={`${selectedRecipe.id}`}
                    value={selectedRecipe.rating ? (isModal ? parseInt(starValue) : selectedRecipe.rating) : isModal ? parseInt(starValue) : 0}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onClick={(e) => {
                        handleClickOpenRecipeModal(e.target.value);
                    }}
                    size="large"
                    style={{ marginLeft: "-.8rem" }}
                    readOnly={isModal ? true : false}
                />
            </Box>
        </div>
    );
}
