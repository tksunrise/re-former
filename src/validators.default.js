const defaultValidators = {
    "required": (value, name, fields) => !value ? `Field ${name} can not be empty` : null,
    "email": (value, name, fields) => {
        const regexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regexp.test(String(value).toLowerCase()) ? `Email address ${value} is incorrect` : null;
    }
};

export default defaultValidators;