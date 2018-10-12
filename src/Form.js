import React from 'react';
import ContextForm from './ContextForm';
import defaultValidators from './validators.default';

class Form extends React.PureComponent {
    constructor(props) {
        super(props);
        const hasExternalState = (typeof this.props.fields !== "undefined" && typeof this.props.updateFields !== "undefined" && typeof this.props.addNewField !== "undefined") ? true : false;
        this.state = {
            hasExternalState,
            fields: !hasExternalState ? {} : this.props.fields
        };
    }

    onSubmit(e) {

    }

    updateFieldProp(fieldName, propName, value) {
        if (this.state.hasExternalState) {
            const newField = this._internalUpdateFieldProp(fieldName, propName, value, this.props.fields);
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
            errors: ['Nie działa '+name],
            errorClass: this.errorClass
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
        return Object.values(this.fields).reduce((prev, field) => field.errors.length ? prev.concat(field.errors()) : prev, []);
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
            registerField: this.registerField.bind(this)
        };
    }

    render() {
        const {method, target, children} = this.props;
        return (
            <ContextForm.Provider value={this.contextObject}>
                <form method={method} target={target} onSubmit={this.onSubmit.bind(this)}>
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