import React from 'react';
import ContextForm from './ContextForm';
import ErrorMessage from './ErrorMessage';
import unique from './unique';

class Field extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {name: null};
    }
    componentWillMount() {
        const {contextFormData, rules, children} = this.props;
        let controlName = this.state.name;
        React.Children.forEach(children, (child) => {
            if (child.type.name !== 'ErrorMessage') {
                const {type, name, value} = child.props;
                const safeName = (typeof name !== 'undefined' && name !== null && name !== '') ? name : unique();
                const safeValue = typeof value !== 'undefined' ? value : '';
                contextFormData.registerField(type, safeName, safeValue, rules);
                controlName = name;
            }
        });
        this.setState(() => ({name: controlName}));

    }

    render() {
        const {contextFormData, children, includeError} = this.props;
        return (
            React.Children.map(children, (child) => {
                if(child.type.name === 'ErrorMessage') {
                    const errorProps = typeof child.props.htmlFor !== 'undefined' ? {} : {htmlFor: this.state.name};
                    return React.cloneElement(child, errorProps);
                }
                const {name, value} = child.props;
                const childProps = {
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
                };
                if(contextFormData.hasError(this.state.name)) {
                    childProps.className = contextFormData.errorClass;
                }
                const inputChild = React.cloneElement(child, childProps);
                if(!!includeError && name in contextFormData.fields && !!contextFormData.fields[name].errors.length) {
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