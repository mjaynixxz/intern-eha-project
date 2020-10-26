import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './layout/Navbar'
import Landing from './layout/Landing'
import Register from './auth/Register'
import Login from './auth/Login'

const Routes = () => {
    return (
        <Fragment>
        <Router>
            <Navbar />
                    <Switch>
                        <Route path='/' exact component={Landing} />
                        <section className='container'>
                        <Route path='/register' exact component={Register} />
                        <Route path='/login' exact component={Login} />
                        </section>
                    </Switch>
                
            </Router>
        </Fragment>
    )
}

export default Routes
