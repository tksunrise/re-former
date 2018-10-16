import React from 'react';
import ContextForm from './ContextForm';
import defaultValidators from './validators.default';

class Form extends React.PureComponent {
    constructor(props) {
        super(props);
        this.formRef = null;
        const hasExternalState = (typeof this.props.fields !== "undefined" && typeof this.props.updateFields !== "undefined" && typeof this.props.addNewField !== "undefined") ? true : false;
        this.state = {
            hasExternalState,
            fields: !hasExternalState ? {} : this.props.fields
        };
    }

    onSubmit(e) {
        this.validateFields();
        e.preventDefault();
        setTimeout(() => {
            Object.values(this.fields).reduce((prev, field) => console.log(field.errors), []);
            console.log(this.allErrors);
            if(!this.hasErrors && !!this.formRef) {
                this.formRef.submit();
            }
        });

    }

    validateFields() {
        Object.values(this.fields).forEach(field => {
            let rules = [];
            if(Array.isArray(field.rules)) {
                rules = field.rules;
            } else if(typeof field.rules === 'string') {
                rules = field.rules.replace(' ', '').split(',');
            }
            let errors = [];
            rules.forEach(rule => {
                let result = null;
                if(typeof rule === 'string' && rule in this.validators) {
                    result = this.validators[rule](field.value, field.name, this.fields);
                } else if(typeof rule === 'function') {
                    result = rule(field.value, field.name, this.fields);
                }
                if(!!result) {
                    if(Array.isArray(result)) {
                        errors = errors.concat(result);
                    } else {
                        errors = errors.concat([result]);
                    }
                }
            });
            this.updateFieldProp(field.name, 'errors', errors);
        });
    }

    updateFieldProp(fieldName, propName, value) {
        if (this.state.hasExternalState) {
            this.props.updateFieldProp(fieldName, propName, value, this.fields);
        } else {
            this.setState(state => ({
                fields: {
                    ...state.fields,
                    [fieldName]: this._internalUpdateFieldProp(fieldName, propName, value, state.fields)
                }
            }));
        }
    }

    _internalUpdateFieldProp(fieldName, propName, value, fields) {
        const field = Object.assign({}, {...fields[fieldName]});
        field[propName] = value;
        return field;
    }

    _createFieldObject(type, name, value, rules, errorClass) {
        return {
            type,
            name,
            value,
            rules,
            edited: false,
            errors: [],
            errorClass: errorClass
        }
    }

    registerField(type, name, value, rules, errorClass) {
        const newField = this._createFieldObject(type, name, value, rules, errorClass);
        if (this.state.hasExternalState) {
            this.props.addNewField(newField);
        } else {
            this.setState(state => ({...state, fields: {...state.fields, [name]: newField}}));
        }
    }

    get fields() {
        return this.state.hasExternalState ? this.props.fields : this.state.fields;
    }

    get allErrors() {
        return Object.values(this.fields).reduce((prev, field) => (!!field.errors.length ? prev.concat(field.errors) : prev), []);
    }

    get hasErrors() {
        return Boolean(this.allErrors.length);
    }

    get validators() {
        return Object.assign({}, defaultValidators, this.props.validators);
    }

    get errorClass() {
        return typeof this.props.errorClass !== 'undefined' ? this.props.errorClass : 'error-field';
    }

    get contextObject() {
        return {
            fields: this.fields,
            validators: this.validators,
            errorClass: this.errorClass,
            updateFields: this.updateFieldProp.bind(this),
            registerField: this.registerField.bind(this),
            hasError: this.hasError.bind(this),
            allErrors: this.allErrors
        };
    }

    hasError(fieldName) {
        return fieldName in this.fields && this.fields[fieldName].errors.length > 0;
    }

    registerFormRef(ref) {
        this.formRef = ref;
    }

    render() {
        const {method, target, children} = this.props;
        return (
            <ContextForm.Provider value={this.contextObject}>
                <form method={method} target={target} onSubmit={this.onSubmit.bind(this)} ref={this.registerFormRef.bind(this)}>
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {});
                        })
                    }
                </form>
            </ContextForm.Provider>
        );
    }
}

export default Form;