import React from 'react';
import { connect } from 'react-redux';

import { Input } from '../../common'

import { login } from '../../../actions';

const Login = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-12 offset-md-3">
        <div className="card">
        <div className="card-body">
        <form>
          <div className="form-group">
            <Input changeValue={props.onChangeValue} type="email" id="user.email" name="Email"/>
          </div>
          <div className="form-group">
            <Input changeValue={props.onChangeValue} type="password" id="user.authentication.password" name="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch => ({
  onChangeValue: (key, value) => dispatch(login.changeValue(key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);