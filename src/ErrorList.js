import React from 'react';
import ContextForm from "./ContextForm";

const ErrorListComponent = ({className, contextFormData}) => {
    const appliedClassName = typeof className !== 'undefined' ? className : 'error-list';
    return (<div className={appliedClassName}>
        <ul>
            {contextFormData.allErrors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
    </div>);
};

const ErrorList = props => (
    <ContextForm.Consumer>
        {contextFormData => <ErrorListComponent {...props} contextFormData={contextFormData}/>}
    </ContextForm.Consumer>
);


export default ErrorList;