import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

import './User.scss';

@inject('stores')
@observer
class Login extends Component {

    state = {
        account : '',
        password : '',
        goToProfile : false,
        goToSignup : false
    };

    render(){
        if(this.state.goToProfile){
            return <Redirect to='/user'/>;
        }

        if(this.state.goToSignup){
            return <Redirect to='/user/signup' />;
        }
        return(
            <div>
                <div className='login-container'>
                    <div><input value={this.state.account} placeholder='ID' onChange={this.updateAccount}/></div>
                    <div><input value={this.state.password} placeholder='PASSWORD' onChange={this.updatePassword} type='password'/></div>
                    <div><button onClick={this.login}>로그인</button></div><div><button onClick={this.signup}>회원가입</button></div>
                </div>
            </div>
        );
    }

    updateAccount = event => {
        this.setState({
            ...this.state,
            account : event.target.value
        });
    };

    updatePassword = event => {
        this.setState({
            ...this.state,
            password : event.target.value
        });
    };

    login = async () => {
        if(await this.props.stores.UserStore.login(this.state)) {
            await this.setState({
                ...this.state,
                goToProfile: true
            });
        }
        else {
            await this.setState({
                ...this.state,
                password: '',
                goToProfile : false
            });
        }
    };

    signup = async () => {
        await this.setState({
            ...this.state,
            goToSignup: true
        });

    };
}

export default Login;