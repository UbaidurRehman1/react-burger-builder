import React, {useEffect} from "react";
import {logout} from "../../../store/actions";
import {Redirect} from "react-router";
import {connect} from 'react-redux'


const Logout = props => {
    useEffect(() => {
        console.log("Logging Out");
        props.onLogout();
    }, [])

    return (
        <Redirect to="/"/>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
