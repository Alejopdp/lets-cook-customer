// Utils & Config
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// External components

// Internal components
import PostCard from "./postCard/postCard";
import SimpleDropdown from "components/atoms/dropdowns/simpleDropdown";
import { Box, Grid } from "@material-ui/core";
import { useLang } from "@hooks";

// Icons & Images

const BlogGrid = (props) => {
    const [selectedTagForFilter, setSelectedTagForFilter] = useState("");
    const router = useRouter();
    const [lang] = useLang("recipesBlog");

    const postsToShow = useMemo(() => {
        console.log("Posts: ", props.posts);
        if (!!!router.query || !!!router.query.tag) return props.posts;

        return props.posts.filter((post) => post.categories.some((category) => category.name === router.query.tag));
    }, [router.query, props.posts]);

    const handleTagForFilter = (value) => {
        if (value === lang.allOption) {
            router.push({ pathname: router.pathname });
            return;
        }

        router.push({
            pathname: `/blogs/recetas/tagged/${value}`,
        });
    };

    return (
        <>
            {!!!props.hideFilter && (
                <Grid item xs={12}>
                    <Box width={200} margin="auto" marginBottom={4}>
                        <SimpleDropdown
                            fullWidth
                            selectedValue={router.query.tag}
                            options={[lang.allOption, ...props.categories] || []}
                            label={"Etiqueta de blog"}
                            handleChange={(e) => handleTagForFilter(e.target.value)}
                        />
                    </Box>
                </Grid>
            )}{" "}
            {postsToShow.map((post, index) => (
                <PostCard key={post.id} post={post} />
            ))}
        </>
    );
};

export default BlogGrid;
