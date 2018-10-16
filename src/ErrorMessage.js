import React from 'react';
import ContextForm from './ContextForm';

const ErrorMesageComponent = ({className, contextFormData, htmlFor}) => {
    if(!(htmlFor in contextFormData.fields)) {
        return null;
    }
    const appliedClassName = typeof className !== 'undefined' ? className : 'error-message';
    switch (contextFormData.fields[htmlFor].errors.length) {
        case 0:
            return null;
        case 1:
            return <div className={appliedClassName}>{contextFormData.fields[htmlFor].errors[0]}</div>;
        default:
            return <div className={appliedClassName}>
                <ul>
                    { contextFormData.fields[htmlFor].errors.map((error, index) => <li key={index}>{error}</li>) }
                </ul>
            </div>;
    }
};

const ErrorMessage = props => (
    <ContextForm.Consumer>
        {contextFormData => <ErrorMesageComponent {...props} contextFormData={contextFormData}/>}
    </ContextForm.Consumer>
);

export default ErrorMessage;

