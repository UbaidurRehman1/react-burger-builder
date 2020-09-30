import React from 'react';
import './App.css';
import Layout from "./components/hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";

function App() {
    return (
        <div>
            <Layout>
                <BurgerBuilder />
            </Layout>
        </div>
    );
}

export default App;
