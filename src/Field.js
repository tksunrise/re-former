import React from 'react';
import ContextForm from './ContextForm';
import ErrorMessage from './ErrorMessage';
import unique from './unique';

class Field extends React.PureComponent {
    componentWillMount() {
        const {contextFormData, rules, children} = this.props;
        React.Children.forEach(children, (child) => {
            if (child.constructor.name !== 'ErrorMessage') {
                const {type, name, value} = child.props;
                const safeName = (typeof name !== 'undefined' && name !== null && name !== '') ? name : unique();
                contextFormData.registerField(type, safeName, value, rules);
            }
        });

    }

    render() {
        const {contextFormData, children} = this.props;

        return (
            React.Children.map(children, (child) => {
                if(child.constructor.name === 'ErrorMessage') {
                    return null;
                }
                const {name, value} = child.props;
                const inputChild = React.cloneElement(child, {
                    value: (typeof value === "undefined" || value === null) ? ((name in contextFormData.fields) ? contextFormData.fields[name].value : '') : value,
                    onChange: (e) => {
                        if(!contextFormData.fields[name].edited) {
                            contextFormData.updateFields(name, 'edited', true);
                        }
                        contextFormData.updateFields(name, 'value', e.target.value);
                        if(typeof child.props.onChange === 'function') {
                            child.props.onChange(e);
                        }
                    }
                });
                if(name in contextFormData.fields && !!contextFormData.fields[name].errors.length) {
                    const errorMessage = <ErrorMessage clasName="error-message" htmlFor={name}/>;
                    return [inputChild, errorMessage];
                } else {
                    return inputChild;
                }
            })
        );
    }
}

const FieldWithContext = props => (
    <ContextForm.Consumer>
        {contextFormData => <Field {...props} contextFormData={contextFormData}/>}
    </ContextForm.Consumer>
);

export default FieldWithContext;