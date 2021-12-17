import React, { useEffect } from "react";
import { useRemark } from "react-remark";

const PostContent = (props) => {
    const [reactContent, setMarkdownSource] = useRemark();

    useEffect(() => {
        setMarkdownSource(props.children);
    }, []);

    return reactContent;
};

PostContent.propTypes = {};

export default PostContent;
