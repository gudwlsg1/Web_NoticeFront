import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import Login from './Login.js';
import SignUp from './SignUp.js';
import UserView from './UserView.js';

@inject('stores')
@observer
class User extends Component {
    render() {
        let userData = this.props.stores.UserStore.user_data;
        if(this.props.match && this.props.match.params.command === 'signup'){
            return <SignUp />
        }
        else if(userData === null){
            return <Login />
        }
        return (
            <UserView/>
        )
    }
}

export default User;