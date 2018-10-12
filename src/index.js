import React from 'react';
import ReactDOM from 'react-dom';

import improve from './improve';
import Form from './Form';
import Field from './Field';
import ErrorMesage from './ErrorMessage';
import ErrorList from './ErrorList';
import Submit from './Submit';

const onSubmit = (e, fields) => console.log('form is sending');

const validators = {
    "required": (value, name, fields) => !value ? `Pole ${name} nie może być puste` : null,
    "email": (value, name, fields) => {
        const regexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regexp.test(String(value).toLowerCase()) ? `Adres email ${value} jest niepoprawny` : null;
    },
    "samePassword": (value, name, fields) => value !== fields.password.value ? "Podane hasła nie są identyczne" : null,
    "postcode": (value, name, fields) => {
        const regexp = /^\d{2}\-\d{3}$/i;
        return regexp.test(String(value).toLowerCase()) ? `Kod pocztowy ${value} jest niepoprawny` : null;
    },
};

/*let ExampleForm = (props) => (
    <Form method="POST" target="/api/user" errorClass="constraint-error" {...props}>
        <ErrorList className="error-list"/>
        <Field rules="email,required" includeError>
            <input type="email" name="email" value={this.props.store.email} onChange={(value) => store.email = value}/>
        </Field>
        <Field rules={[validators.required]}>
            <input type="password" name="password" value={this.props.store.password} onChange={(value) => store.password = value}/>
            <ErrorMesage htmlFor="email" className="error-message" />
            <ErrorMesage className="error-message" />
        </Field>
        <Field rules="required,samePassword">
            <input type="password" name="password" value={this.props.store.password2} onChange={(value) => store.password2 = value}/>
            <ErrorMesage className="error-message" />
        </Field>
        <Field rules="required,postcode">
            <input type="text" name="postCode" value={this.props.store.postCode} onChange={(value) => store.postCode = value}/>
            <ErrorMesage className="error-message" />
        </Field>
        <Submit>
            <input type="submit"/>
        </Submit>
    </Form>
);*/

let ExampleForm = (props) => (
    <Form method="POST" target="/api/user" errorClass="constraint-error" {...props}>
        <Field rules="email,required" includeError>
            <input type="email" name="email" />
            <ErrorMesage className="error-message" htmlFor="surname" />
        </Field>
        <Field rules="email,required">
            <input type="text" name="name" />
            <ErrorMesage className="error-message" />
        </Field>
        <Field rules="email,required">
            <input type="text" name="surname" />
        </Field>
    </Form>
);

ExampleForm = improve(onSubmit, validators)(ExampleForm);
ReactDOM.render(<ExampleForm/>, document.getElementById('root'));
