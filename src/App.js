import React, {useEffect} from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Redirect, Route, Switch} from 'react-router-dom'
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/auth/Auth";
import Logout from "./containers/auth/Logout/Logout";
import {connect} from 'react-redux'
import {authCheckState} from "./store/actions";

const App = props => {

    useEffect(() => {
        console.log("App TryAutoSignUp");
        props.onTryAutoSignUp();
    }, [])

    let routes = (
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/" />
        </Switch>
    );

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/orders" exact component={Orders}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/" />
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
