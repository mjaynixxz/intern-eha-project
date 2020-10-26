import React, {Fragment, useContext} from 'react'
import Context from '../../utils/context';




const Alert = () => {
    const {stateAlert} = useContext(Context)
    
    const renderAlert = () => {
        return stateAlert === null && stateAlert.length === 0 ? 'Loading': stateAlert.map(alert => {

           return( 
               <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
           )
        })
    }

    return (
        <Fragment>
            {renderAlert()}
        </Fragment>
    )
}

export default Alert
