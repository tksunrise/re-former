import React from 'react';

const improve = (onSubmit=(e)=>null, validators={}, otherProps = {}) => (component) => {
    const props = Object.assign({}, {...component.props}, {onSubmit, validators}, {...otherProps});
    return React.cloneElement(component, {...props});
};

export default improve;