import React from 'react';

const Submit = ({onSubmit, children, ...props}) => {
    return <input type="submit" value={children} {...props} />;
};

export default Submit;