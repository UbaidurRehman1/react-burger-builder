import React from "react";
import {useState} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import RequestResolver from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

const ContactData = props => {
    const [isFormValid, setFormValidity] = useState(false);
    const [form, setForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched:false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched:false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZipCode'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched:false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched:false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched:false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {
                        value: 'fastest',
                        displayValue: 'Fastest'
                    },
                    {
                        value: 'cheapest',
                        displayValue: 'Cheapest'
                    }
                ]
            },
            value: 'fastest',
            validation: {
                required: false
            },
            valid: true,
            touched:false
        }
    });
    const [loading, setLoading] = useState(false);

    const inputHandler = (value, elementIdentifier) => {

        const updatedForm = {
            ...form
        }

        const updateFormElement = {
            ...updatedForm[elementIdentifier]
        }

        updateFormElement.value = value;
        updateFormElement.valid = checkValidity(updateFormElement.value, updateFormElement.validation)
        updateFormElement.touched = true;
        updatedForm[elementIdentifier]  = updateFormElement;

        let isFormValid = true;
        for (let inputIdentifier in updatedForm) {
            isFormValid = isFormValid && updatedForm[inputIdentifier].valid;
        }
        if (isFormValid === undefined) {
            console.log(updateFormElement);
        }

        console.log('IsFormValid: ', isFormValid);
        setFormValidity(isFormValid);
        setForm(updatedForm);
    }

    const orderHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = {};
        for (let formElementIdentifier in form) {
            formData[formElementIdentifier] = form[formElementIdentifier].value;
        }
        console.log(formData);
        const order = {
            ingredients: {...props.ingredients},
            price: props.price,
            orderData: {...formData}
        }

        console.log(order);
        RequestResolver.post('/orders.json', order)
            .then((response) => {
                setLoading(false);
                console.log(response);
                props.history.push('/');
            }).catch((error) => {
            setLoading(false);
            console.log(error);
        });
        console.log(props.ingredients);
    }

    const checkValidity = (value, rules) => {
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

    const formElementArray = [];
    for (let key in form) {
        if (form.hasOwnProperty(key)) {
            formElementArray.push({
                id: key,
                config: form[key]
            })
        }
    }

    return (
        loading ? <Spinner/> :
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={(event) => orderHandler(event)}>
                    {
                        formElementArray.map(formElement => {
                            return (
                                <Input
                                    key={formElement.id}
                                    elementIdentifier={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    inputHandler={inputHandler}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}
                                />
                            );
                        })
                    }
                    <Button btnType="Success"
                            disabled={!isFormValid}
                    >Order</Button>
                </form>
            </div>
    );
}

export default ContactData;
