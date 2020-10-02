import React from "react";
import classes from './Input.module.css'

const Input = props => {
    const inputType = props.elementType;
    let inputElement;
    const inputClasses = [classes.InputElement]
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (inputType) {
        case 'input':
            inputElement = <input
                onChange={(event) => props.inputHandler(event.target.value, props.elementIdentifier)}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>;
            break;
        case 'textArea':
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
            break;
        case 'select':
            inputElement = <select
                onChange={(event) => props.inputHandler(event.target.value, props.elementIdentifier)}
                className={inputClasses.join(' ')}
                value={props.value}
            >
                {
                    props.elementConfig.options.map(option => {
                        return (<option
                            key={option.value}
                            value={option.value}
                        >{option.displayValue}</option>)
                    })
                }
            </select>
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;
