import React, { Fragment , useReducer} from 'react'
import Routes from './components/routes';
import Context from './utils/context'
import {INITIAL_STATE, alertReducer} from './store/reducers/alert';






const Contextstate = () => {
    const [ stateAlert, dispatchAlert ] = useReducer(alertReducer, INITIAL_STATE)
    return (
        <Fragment>
        <Context.Provider
        value ={{ stateAlert, dispatchAlert }}
        >
            <Routes />
        </Context.Provider>
        </Fragment>
    )
}

export default Contextstate
