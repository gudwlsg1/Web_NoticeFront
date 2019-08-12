import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

import './User.scss';

@inject('stores')
@observer
class SignUp extends Component {

    state = {
        account : '',
        password : '',
        pastPassword : '',
        nickname : '',
        checkAccount : false,
        checkPassword : false
    };

    render(){
        if(this.state.goToUser){
            return <Redirect to='/user'/>;
        }

        if(this.state.goToHome){
            return <Redirect to='/'/>;
        }
        return(
            <div>
                <div className='signUp-container'>
                    <div>희망아이디 : <input value={this.state.account} onChange={this.updateAccount}/><button onClick={this.checkAccount}>중복체크</button></div>
                    <div>희망패스워드 : <input value={this.state.password} onChange={this.updatePassword} type='password'/></div>
                    <div>패스워드확인 : <input value={this.state.pastPassword} onChange={this.updatePaswPassword} type='password'/>
                    <button onClick={this.checkPassword}>확인</button></div>
                    <div>닉네임 : <input value={this.state.username} onChange={this.updateUserName}/></div>
                    <button onClick={this.signUp}>확인</button><button onClick={this.cancle}>취소</button>
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

    updatePaswPassword = event => {
        this.setState({
            ...this.state,
            pastPassword : event.target.value
        });
    };

    updateUserName = event => {
        this.setState({
            ...this.state,
            nickname  : event.target.value
        });
    };

    checkAccount = async () => {
        if(await this.props.stores.UserStore.checkAccount(this.state.account)) {
            alert("중복된 아이디가 존재합니다.");
            return;
        }
        alert("사용 가능한 아이디입니다.");
            this.setState({
                ...this.state,
                checkAccount  : true
            });
    };

    checkPassword = () => {
        if(this.state.password !== this.state.pastPassword){
            alert("비밀번호가 같지 않습니다.");
            return;
        }

        alert("비밀번호가 일치합니다.");
        this.setState({
            ...this.state,
            checkPassword  : true
        });
    };

    signUp = async () => {
        if(!this.state.checkAccount){
            alert("아이디 중복 확인을 해주세요.");
            return;
        }

        if(!this.state.checkPassword){
            alert("비밀번호 확인을 해주세요.");
            return;
        }

        if(await this.props.stores.UserStore.signup(this.state)) {
            await this.setState({
                ...this.state,
                goToUser: true
            });
        }
        else {
            await this.setState({
                ...this.state,
                password: '',
                goToUser : false
            });
        }
    };
    cancle = async () => {
        await this.setState({
            ...this.state,
            goToHome: true
        });
    };
}

export default SignUp;