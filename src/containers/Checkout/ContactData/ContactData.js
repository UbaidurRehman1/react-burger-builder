import React from "react";
import {useState} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import RequestResolver from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

const ContactData = props => {
    const [address, setAddress] = useState({
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    });
    const [loading, setLoading] = useState(false);


    const orderHandler = () => {
        setLoading(true);
        const order = {
            ingredients: {...props.ingredients},
            price: props.price,
            customer: {
                name: 'Ubaid',
                address: {
                    street: 'Lahore ki gali',
                    zipCode: '444000',
                    country: 'Pakistan'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

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

    return (
        loading ? <Spinner/> :
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
                <input className={classes.Input} type='text' name='email' placeholder='Your Email'/>
                <input className={classes.Input} type='text' name='street' placeholder='Street'/>
                <input className={classes.Input} type='text' name='postalCode' placeholder='Postal Code'/>
                <Button btnType="Success"
                        clicked={orderHandler}
                        preventDefaultBehavior
                >Order</Button>
            </form>
        </div>
    );
}

export default ContactData;
