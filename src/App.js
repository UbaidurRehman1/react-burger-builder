import React, {Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import {authCheckState} from "./store/actions";

import './App.css';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/auth/Logout/Logout";
import {connect} from 'react-redux'

const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = React.lazy(() => import('./containers/Orders/Orders'));
const AsyncAuth = React.lazy(() => import('./containers/auth/Auth'));


const App = props => {

    useEffect(() => {
        props.onTryAutoSignUp();
    }, [])

    let routes = (
        <Switch>
            <Suspense fallback={<div>Loading...</div>}>
               <Route path="/auth" component={AsyncAuth}/>
                <Route path="/" exact component={BurgerBuilder}/>
            </Suspense>
            <Redirect to="/" />
        </Switch>
    );

    if (props.isAuth) {
        routes = (
            <Switch>
                <Suspense fallback={<div>Loading...</div>}>
                    <Route path="/checkout" component={AsyncCheckout}/>
                    <Route path="/orders" exact component={AsyncOrders}/>
                    <Route path="/auth" component={AsyncAuth}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/" />
                </Suspense>
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                {routes}
            </Layout>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
