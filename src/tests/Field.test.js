/*import React from "react";
import {mount, shallow} from 'enzyme'
import Form from "../Form";
import Field from "../Field";
import ErrorMesage from "../ErrorMessage";

const ExampleForm = (props) => (
    <Form method="POST" target="/api/user" errorClass="constraint-error" {...props}>
        <Field rules="email,required">
            <input type="email" name="email" />
            <ErrorMesage className="error-message" />
        </Field>
    </Form>
);

describe('Field', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<ExampleForm />);
    });

    test('should have an `input` element', () => {
        expect(wrapper.matchesElement(<input />)).to.equal(true);
    });
});*/