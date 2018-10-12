# re-former
This is a library to make creating forms in React much simplier. It provides few elements which provide functionality to user.

Re-former can use external store (eg. in Redux) or keep its state in itself.

## Elements

### <Form>

Properties:

| name         | type     | defaultValue     |
|--------------|----------|------------------|
| method       | string   | GET              |
| target       | string   | undefined        |
| errorClass   | string   | error-constraint |
| fields       | object   | undefined        |
| updateFields | function | undefined        |
| addNewField  | function | undefined        |

