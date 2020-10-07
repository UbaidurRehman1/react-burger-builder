import React, {useEffect, useState} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './auth.module.css'
import {auth, setAuthRedirectPath} from "../../store/actions";
import {connect} from 'react-redux';
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router";

const Auth = props => {

    useEffect(() => {
        if (!props.building && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath('/');
        }
    })

    const [isSignUpMode, setSignUpMode] = useState(true);

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

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

    const inputChangeHandler = (value, controlName) => {
        const updatedControl = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: value,
                valid: checkValidity(value, controls[controlName].validation),
                touched: true
            }
        }
        setControls(updatedControl);
    }

    const formElementArray = [];
    for (let key in controls) {
        formElementArray.push({
            id: key,
            config: controls[key]
        });
    }

    const form = formElementArray.map(formElement => {
        return (
            <Input
                key={formElement.id}
                elementIdentifier={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                inputHandler={inputChangeHandler}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
            />
        );
    });

    const switchModeHandler = () => {
        setSignUpMode(prevState => !prevState);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUpMode);
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    return (
        props.loading ? <Spinner/>
            : props.isAuth ? <Redirect to={props.authRedirectPath}/>
            : <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={(event) => submitHandler(event)}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button
                    clicked={switchModeHandler}
                    btnType="Danger">Switch to {isSignUpMode ? 'SignIn' : 'SignUp'}</Button>
            </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token != null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUpMode) => dispatch(auth(email, password, isSignUpMode)),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
