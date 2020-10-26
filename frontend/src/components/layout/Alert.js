import React, {useContext} from 'react'
import Context from '../../utils/context'


const Alert = () => {
    const { stateAlert } = useContext(Context)

    const renderAlert = () => stateAlert !== null && stateAlert.length > 0 && stateAlert.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
    ))
    return (
        
        <div>
            {renderAlert()}
        </div>
    )
}

export default Alert
