import React from 'react';

const improve = (onSubmit=(e)=>null, validators={}, otherProps = {}) => (Component) => {
    return function ImprovedForm(props) {
        const newProps = Object.assign({}, {...props}, {onSubmit, validators}, {...otherProps});
        return <Component {...newProps}/>;
    }
};

export default improve;