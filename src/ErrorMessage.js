import React from 'react';
import ContextForm from './ContextForm';

const ErrorMesage = ({className, contextFormData, htmlFor}) => {console.log(htmlFor);
    if(!(htmlFor in contextFormData.fields)) {
        return null;
    }
    switch (contextFormData.fields[htmlFor].errors.length) {
        case 0:
            return null;
        case 1:
            return <div className={className}>{contextFormData.fields[htmlFor].errors[0]}</div>;
        default:
            return <div className={className}>
                <ul>
                    { contextFormData.fields[htmlFor].errors.map(error => <li>{error}</li>) }
                </ul>
            </div>;
    }
};

const ErrorMesageWithContext = props => (
    <ContextForm.Consumer>
        {contextFormData => <ErrorMesage {...props} contextFormData={contextFormData}/>}
    </ContextForm.Consumer>
);

export default ErrorMesageWithContext;

