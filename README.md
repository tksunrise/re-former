# re-former
This is a library to make creating forms in React much simplier. It provides few elements which provide functionality to user.

Re-former can use external store (eg. in Redux) or keep its state in itself.

## Elements

### &lt;Form&gt;
It defines a form component in which will be created other components. 
There is stored a local store and it provides a context to other controls. 
The form allows to use any fields. There can be any nested structure. 
You can use traditional form attributes as in original HTML tag eg. method or target attribute. 
It's also available to use onSubmit method. It will be called just when validation has been finished without errors.

Properties:

| name         | type     | defaultValue     |
|--------------|----------|------------------|
| method       | string   | GET              |
| target       | string   | undefined        |
| errorClass   | string   | error-constraint |
| onSubmit     | function | undefined        |
| validators   | object   | {}               |
| fields       | object   | undefined        |
| updateFields | function | undefined        |
| addNewField  | function | undefined        |

* _method_ - it is HTTP method being used to send the form.
* _target_ - if this argument is not defined, then any HTTP method will be used to send it. 
You can send it manually eg. using AJAX in your onSubmit() handler.
* _errorClass_ - the class which will be assigned to a form control when its validation rules are not satisfied.
* _onSubmit()_ - this method takes fields object as its parameter. 
It's being called only when validation has been finished successfully.
* _fields_ - fields object which is provided to the form from external place.
* _updateFields_ - method being used to update fields object in external place.
* _addNewField_ - method being used to add new field to external fields object.


### &lt;Field&gt;
Wrapper to set validation rules to included form control. 
It should contain only HTML input and optionally error message container. 
If you use other library to create more complicated input controls, 
then you can use value and onChange properties which are injected by _Field_ component to its children.

Properties:

| name         | type         | defaultValue |
|--------------|--------------|--------------|
| rules        | array|string | undefined    |
| includeError | boolean      | false        |

* _rules_ - this array includes rules which are applied to the field. All of them will be checked until validation process. More details below.
* _includeError_ - a flag to specify if &lt;ErrorMessage&gt; should be automatically rendered for this field after a form control.

### &lt;ErrorMessage&gt;
It displays error messages for single field. In single component can be displayed one or more errors.

Properties:

| name      | type   | defaultValue    |
|-----------|--------|-----------------|
| className | string | "error-message" |
| htmlFor   | string | <parent_field>  |

* _className_ - class which is applied to &lt;ErrorMessage&gt; component. You can use it to specify special CSS styles.
* _htmlFor_ - it informs which field errors are displayed in the component. 
Automatically there will be displayed errors coming from the same field. 
However, it's possible to display errors in different places.

### &lt;ErrorList&gt;
It displays all errors which has been occured in any field.

Properties:

| name      | type   | defaultValue |
|-----------|--------|--------------|
| className | string | "error-list" |

* _className_ - class which is applied to &lt;ErrorList&gt; component. You can use it to specify special CSS styles.

### &lt;Submit&gt;
It provides a submit button fully integrated with other part of the library. 
It takes the same parameters as HTML input tag, but text of button is taken as a child.

## External data
In basic usage the form has its own store to keep fields data. You can also use external store eg. Redux. All what you need is just pass tree parameters to the _Form_ component:
* fields,
* updateFields,
* addNewField.

The first one is an object and the two others are methods.

### Fields object
Keys of the fields object are names of fields. It allows to find data of single one in easy way. 
Every value there is an object with fields:
* **type** _(string)_ - type of the field; it has similar value to 'type' attribute of _input_ field, 
additionally including 'textarea' type. If there is other type, the value will be set as _undefined_;
* **name** _(string)_ - it is a name of field; it identifies field in the form; 
if you don not specify _name_ attribute in a child of _Field_ component, then it will be randomly chosen;
* **value** _(mixed)_ - value of field; 
it can be everything but if you use traditional HTTP form sending, then it should be serializable to string value;
* **rules** _(array|string)_ - it can be an array or string with list of rules which are applicable to the field; 
more information about it is located in description of _Field_ component;
* **edited** _(string)_ - a flag which informs if the field has been edited;
* **errors** _(array)_ - a list of error messages which are found already; 
it's being refreshed after validation process; no messages means no errors;
* **errorClass** _(string)_ - class which will be assigned to input fields if value of it doesn't satisfy its rules;
