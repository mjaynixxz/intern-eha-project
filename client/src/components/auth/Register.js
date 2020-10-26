import React, { Fragment, useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import Context from '../../utils/context';
import {setAlert, removeAlert} from '../../store/actions/alert';
import Alert from '../layout/Alert'


const Register = () => {

const { stateAlert, dispatchAlert } = useContext(Context);

const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  password2: ''

});



const { name, email, password, password2 } = formData;

const onChange = (e) => {
  setFormData({[e.target.name]: e.target.value});
}

const onSubmit = (e) => {
  e.preventDefault();
  if (password !== password2 ) {
    console.log('password not correct')
    dispatchAlert(setAlert('Password not correct', 'danger'))
    setTimeout(() => {
      dispatchAlert(removeAlert(2))
    }, 500);
    console.log(stateAlert)

  } else {
    console.log(formData)
  }
}


    return (
        <Fragment>
        <h1 className="large text-primary">Register</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <Alert />
        <form className="form" onSubmit={(e)=>onSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" required value={name} onChange={(e)=>onChange(e)} />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e)=>onChange(e)}/>
            <small className="form-text"
              >Please type in a valid email address</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e)=>onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={(e)=>onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to='/login'>Log In</Link>
        </p>
    
        </Fragment>
    )
}

export default Register
