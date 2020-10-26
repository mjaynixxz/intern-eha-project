import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './layout/Landing';
import Navbar from './layout/Navbar';
import Register from './auth/Register';
import Login from './auth/Login';

const Routes = () => {
    return (
        <Router>
             <Fragment>
                <Navbar />
                <Route exact path='/' component={Landing} />
                
                <Switch>
                    <>
                    <section className="container">
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    </section>
                    </>
                    </Switch>
                </Fragment>
         </Router>
    )
}

export default Routes
