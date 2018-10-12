import React from "react";
import { expect } from 'chai';
import {mount, shallow} from 'enzyme'
import Form from "../Form";
import ErrorMesage from "../ErrorMessage";

const method="POST";
const target="/api/user";
const errorClass="constraint-error";
const ExampleForm = (props) => (
    <Form method={method} target={target} errorClass={errorClass} {...props} />
);

describe('Field', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ExampleForm />);
    });

    test('should have correct method prop', () => {
        expect(wrapper.find(<Form/>)).to.have.property('method', method);
    });
});