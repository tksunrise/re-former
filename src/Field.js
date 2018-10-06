import React from 'react';
import defaultValidators from './validators.default';

class Form extends React.PureComponent {
    constructor(props) {
        super(props);
        this.fiel
    }
    onChangeFieldProp(fieldName, propName, value, fields) {
        return {...fields, [name]: {...fields[name]}}
    }
    onSubmit(e) {

    }
    render() {
        const {method, target, children} = this.props;
        const validators  = Object.assign({}, defaultValidators, this.props.validators);
        return (<form method={method} target={target} onSubmit={this.onSubmit.bind(this)}>
            {
                React.Children.map(children, (child) => {
                    return React.cloneElement(child, {validators});
                })
            }
        </form>);
    }
}

export default Form;