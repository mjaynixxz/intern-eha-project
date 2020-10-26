import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../utils/context';
import {setAlert, removeAlert} from '../../store/actions/alert'
import Alert from '../layout/Alert'
import { REMOVE_ALERT } from '../../store/actions/types';

const Register = () => {

  const { stateAlert, dispatchAlert } = useContext(Context);


const [ formData, setFormData ] = useState({
  name: '',
  email:'',
  password: '',
  password2: ''
});



const { name, email, password, password2 } = formData;

const onChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value});

}

const alertfunction = () => {
  dispatchAlert(setAlert('Password do not match', 'danger'));
  setTimeout(() => dispatchAlert(removeAlert(2)), 5000)
}



const onSubmit = (e) => {
  e.preventDefault();
  if (password !== password2) {
    
    alertfunction();
    
  }else {
    console.log(formData)
  }
  

}
  
  
  return (
        <Fragment>
        <h1 className="large text-primary">Register</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e=>onSubmit(e)}>
        <Alert />
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" required  onChange={e => onChange(e)} value={name} />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" onChange={e => onChange(e)} value={email} />
            <small className="form-text"
              >Please type in a valid email address</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              onChange={e => onChange(e)} value={password}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              onChange={e => onChange(e)} value={password2}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        </Fragment>
       
    )
  }
export default Register
