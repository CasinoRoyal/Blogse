import { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import { signin, authenticate, isAuth } from '../../actions/auth.action';

const Signin = () => {
  const initialState = {
    email: '',
    password: '',
    message: '',
    error: false,
    loading: false,
    showForm: true
  };
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    isAuth() && Router.push('/')
  })

  const { email, password, loading, error, message } = formData;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({...formData, loading: true, error: false});
    try{
      const data = await signin({email, password});

      if (data.error || data.status === 'fail') {
        const errorMsg = data.error || data.message;
        return setFormData({
          ...formData, 
          loading: false, 
          error: true, 
          message: errorMsg
        });
      }

      setFormData({
        ...formData,
        loading: false,
        error: false, 
        message: data.message,
        name: '',
        email: '',
        password: ''
      });

      authenticate(data, () => Router.push('/'));
    } catch(err) {
      console.log(err);
    }
  };

  const showLoading = () => 
    loading ? <div className="alert">Loading...</div> : null;
  
  const showMessage = () => (
    message ?
      <div className={`alert alert-${error ? 'danger' : 'success'}`}>
        {message}
      </div>
      :
      null 
  );
   
  const SigninForm = () => (
    <form className='d-flex flex-column' onSubmit={handleSubmit}>
      <label className='form-group'>
        <input
          className="form-control" 
          type="email" 
          onChange={handleChange} 
          value={email}
          name='email'
          placeholder='Email'
          required />
      </label>
      <label className='form-group'>
        <input
          className="form-control" 
          type="password" 
          onChange={handleChange} 
          value={password}
          name='password'
          placeholder='Password'
          required />
      </label>
      <div>
        <button type='submit' className="btn btn-primary">Sign in</button>            
      </div>
    </form>
  );

  return(
    <Fragment>
      {showLoading()}
      {showMessage()}
      {SigninForm()}
    </Fragment>
  )
};

export default Signin;