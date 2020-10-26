import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <Fragment>
    <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">eHA-Game-TV</h1>
            <p className="lead">
              Stream to watch your favorite eHA Gamers
            </p>
            <div className="buttons">
              <Link to='/register' className="btn btn-primary">Register</Link>
              <Link to='/login' className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
        </Fragment>
    )
}

export default Landing
