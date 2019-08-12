import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';
import UserPostList from "./UserPostList";

@inject('stores')
@observer
class UserView extends Component {
    state = {
        goToEdit : false
    };

    componentDidMount() {
        this.props.stores.PostStore.fetchItemByUser(this.props.stores.UserStore.user_data.id);
    }

    render() {
        let p = this.props.stores.PostStore;

        if(this.state.goToEdit){
            return <Redirect to='/user/edit' />;
        }
        let user = this.props.stores.UserStore.user_data;
        let created = new Date(user.created);
        console.log(p.viewItemByUser);
        return(
            <div>
                <div>이름 : {user.nickname}</div>
                <div>가입일 : {created.getMonth() + 1}-{created.getDate()} </div>
                <div>
                    내가 쓴 글 :
                    {p.viewItemByUser && <UserPostList items={p.viewItemByUser}/>}
                </div>
                <div><button onClick={this.logout}>로그아웃</button></div>
            </div>
        )
    }

    logout = ()=> {
        this.props.stores.UserStore.logout();
    };

    userEdit = async ()=>{
        await this.setState({
                ...this.state,
                goToEdit : true
            }
        );
    }
}

export default UserView;