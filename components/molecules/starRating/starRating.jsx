import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { Box } from "@material-ui/core";

export default function SimpleRating({ handleClickOpenRecipeModal, isModal, fullScreen, selectedRecipe, starValue }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (starValue === 0) setValue(0);
    }, [starValue]);

    return (
        <div>
            <Box
                component="fieldset"
                style={{
                    display: isModal ? "flex" : null,
                    justifyContent: isModal ? "center" : null,
                    margin: "0px",
                    padding: "0px",
                    border: "none",
                }}
            >
                <Rating
                    name={`${selectedRecipe.id}`}
                    value={
                        selectedRecipe.rating ? (isModal ? parseInt(starValue) : selectedRecipe.rating) : isModal ? parseInt(starValue) : 0
                    }
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onClick={(e) => {
                        handleClickOpenRecipeModal(e.target.value);
                    }}
                    size="large"
                />
            </Box>
        </div>
    );
}
