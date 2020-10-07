export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '';
    }
    if (isValid && rules.minLength) {
        isValid = value.trim().length >= rules.minLength;
    }
    if (isValid && rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength;
    }
    return isValid;
}
