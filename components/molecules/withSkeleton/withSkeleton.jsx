import React from "react";
import PropTypes from "prop-types";

const WithSkeleton = (Component) => (props) => {
    return props.isLoading ? props.skeleton : <Component {...props} />;
};

WithSkeleton.propTypes = {};

export default WithSkeleton;
