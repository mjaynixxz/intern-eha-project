import React, { Fragment, useReducer } from 'react';

import Context from './utils/context';
import Routes from './components/Routes';

import { INITIAL_STATE, alertReducer } from './store/reducers/alert'; 


const ContextState = () => {

    const [ stateAlert, dispatchAlert ] = useReducer(alertReducer, INITIAL_STATE)

   
    return(
        <Fragment>
            <Context.Provider value={{ stateAlert, dispatchAlert }}>
                <Routes />
            </Context.Provider>
        </Fragment>
    );
}

export default ContextState;