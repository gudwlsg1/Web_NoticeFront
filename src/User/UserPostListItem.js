import React, {Component } from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';

@inject('stores')
@observer
class UserPostListItem extends Component {
    render() {
        let {post} = this.props;
        let postUrl = `/post/view/${post.id}`;
        return (
            <div>
                <div>
                    <Link to={postUrl}> {post.title}</Link>
                </div>
            </div>
        );
    }
}

export default UserPostListItem;