import React, {useState} from "react";
import classes from './Layout.module.css'
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        console.log("Toggle Handler");
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <React.Fragment>
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
            />
            <SideDrawer
                open={showSideDrawer}
                closeHandler={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default Layout;
