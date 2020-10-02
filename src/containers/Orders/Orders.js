import React, {useEffect, useState} from "react";
import Order from "../../components/Order/Order";
import RequestResolver from "../../axios-orders";
import ErrorHandler from "../../components/hoc/ErrorHandler/ErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        RequestResolver.get('/orders.json')
            .then((response) => {
                console.log(response.data);
                const orders = [];
                const data = response.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        orders.push({
                            ...data[key],
                            id: key
                        })
                    }
                }
                console.log(orders);
                setOrders(orders);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
        })
    }, []);

    // let orderView = (
    //     orders.map(order => {
    //         return <Order/>
    //     })
    // );
    //
    // if (loading) {
    //     orderView = <Spinner/>;
    // }

    return (
        loading ? <Spinner/> :
        <div>
            {
                orders.map(order => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                })
            }
        </div>
    );
}

export default ErrorHandler(Orders, RequestResolver);
