import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PostView from "./PostView";
import PostAdd from "./PostAdd";

@inject('stores')
@observer
class Post extends Component {
    constructor(props){
        super(props);
        if(this.props.match.params.index && this.props.stores.PostStore.viewItem){
            let post = this.props.stores.PostStore.viewItem;
            this.state = {
                ...this.state,
                title : post.title,
                content : post.content,
                id : post.id,
                userId : this.props.stores.UserStore.user_data.id
            }
        }
    }

    componentDidMount() {

    }

    state = {
        userId : -1,
        title : '',
        content : '',
        goToList: false,
        goToPost: false,
        id : -1
    };

    render() {
        if(this.props.stores.UserStore.user_data === null){
            alert("로그인 후 이용해 주세요!");
            return <Redirect to='/user/login' />;
        }

        if(this.state.goToList){
            return <Redirect to='/'/>
        }

        if(this.props.match && this.props.match.params.command === 'view'){
            return <PostView postId={this.props.match.params.index}/>
        }

        if(this.props.match && this.props.match.params.command === 'add'){
            return <PostAdd />
        }

        if(this.props.match && this.props.match.params.command === 'edit'){
            return <PostAdd postid={this.props.match.params.index} />;
        }

        return (
            <div>

            </div>
        )
    }
}

export default Post;