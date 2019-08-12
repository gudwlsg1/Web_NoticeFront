import React, {Component } from 'react';
import {inject, observer} from "mobx-react";

import './Comment.css';

@inject('stores')
@observer
class CommentItem extends Component {
    state = {
        id : 0,
        postId : 0
    };
    render() {
        let {comment} = this.props;
        if(comment){
            this.state.id = comment.id;
            this.state.postId = comment.postId
        }
        return (
            <div className='comment-view'>
                <div>{comment.username}</div>
                <div>{comment.content}</div>
                <div>{new Date(comment.created).getFullYear() + "-" +  (new Date(comment.created).getMonth() + 1) + "-" + new Date(comment.created).getDay() + "                      " +
                new Date(comment.created).getHours() + ":" + new Date(comment.created).getMinutes() + ":" + new Date(comment.created).getSeconds()}</div>
                <div> {this.props.stores.UserStore.user_data && comment.userId === this.props.stores.UserStore.user_data.id &&  <button onClick={this.deleteComment}>삭제</button>}  </div>
            </div>
        );
    }
    deleteComment = async () => {
        if(await this.props.stores.CommentStore.deleteComment(this.state)){
        }
    }
};

export default CommentItem;