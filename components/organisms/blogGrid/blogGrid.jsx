// Utils & Config
import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

// External components

// Internal components
import PostCard from "./postCard/postCard";

// Icons & Images

const BlogGrid = (props) => {
    return (
        <>
            {props.posts.map((post, index) => (
                <PostCard key={index} post={post} />
            ))}
        </>
    );
};

export default BlogGrid;
