import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Box } from "@material-ui/core";

export default function SimpleRating({ handleClickOpenRecipeModal, isModal, fullScreen, selectedRecipe }) {
    const [value, setValue] = React.useState(0);

    console.log(selectedRecipe.id, "id")
    console.log(selectedRecipe.rating, "rating")

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
                    value={selectedRecipe.rating !== undefined ? selectedRecipe.rating : 0}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onClick={() => handleClickOpenRecipeModal ? handleClickOpenRecipeModal() : console.log("click")}
                    size="large"
                    style={{ marginLeft: "-.8rem" }}
                />
            </Box>
        </div>
    );
}
