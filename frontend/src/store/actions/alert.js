import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => {
    const id = uuidv4();
    console.log(id)
    
    return {
        type: SET_ALERT,
        payload: { msg, alertType, id }
    }
}    



export const removeAlert = (no) => {
    // const id = uuidv4();
    return {
        type: REMOVE_ALERT,
        payload: no
    }
}

// async function updateUser(dispatch, user, updates) {
//     dispatch({type: 'start update', updates})
//     try {
//       const updatedUser = await userClient.updateUser(user, updates)
//       dispatch({type: 'finish update', updatedUser})
//     } catch (error) {
//       dispatch({type: 'fail update', error})
//     }
//   }

// const updateProductBackend = async (product, dispatch) => {
//     const result = await updateBackend(product);
//     if (result.success) {
//       dispatch({ type: “success” });
//     } else {
//       dispatch({ type: “failure” });
//     }
//    }