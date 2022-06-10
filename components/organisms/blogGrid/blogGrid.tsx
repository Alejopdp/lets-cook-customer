// Utils & Config
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// External components

// Internal components
import PostCard from "./postCard/postCard";
import { Box, Grid } from "@material-ui/core";
import { useLang } from "@hooks";
import { Post, PostCategory } from "types/post";
import BlogCategoriesDropdown from "./categoryDropdown";

// Icons & Images

interface BlogGridProps {
    categories: PostCategory[];
    posts: Post[];
    hideFilter: boolean;
    shallowRedirection?: boolean;
    pathName: string;
}

const BlogGrid = (props: BlogGridProps) => {
    const router = useRouter();
    const [lang] = useLang("recipesBlog");
    const [filteredPosts, setFilteredPosts] = useState(props.posts);

    useEffect(() => {
        if (!!!router.query || !!!router.query.tag) {
            setFilteredPosts(props.posts);
            return;
        }
        setFilteredPosts(props.posts.filter((post) => post.categories.some((category) => category.slug === router.query.tag)));
    }, [router.query, props.posts]);

    const handleTagForFilter = (value) => {
        if (value === lang.allOption) {
            router.push({ pathname: props.pathName });
            return;
        }

        router.push(
            {
                pathname: `${props.pathName}/tagged/${value}`,
            },
            undefined,
            { shallow: props.shallowRedirection }
        );
    };

    return (
        <>
            {!!!props.hideFilter && (
                <Grid item xs={12}>
                    <Box width={200} margin="auto" marginBottom={4}>
                        <BlogCategoriesDropdown
                            fullWidth
                            selectedValue={router.query?.tag || lang.allOption}
                            options={[{ name: lang.allOption, slug: lang.allOption, id: lang.allOption }, ...props.categories] || []}
                            label={"Etiqueta de blog"}
                            handleChange={(e) => handleTagForFilter(e.target.value)}
                        />
                    </Box>
                </Grid>
            )}
            {filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} />
            ))}
        </>
    );
};

export default BlogGrid;
