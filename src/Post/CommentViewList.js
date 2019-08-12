import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import CommentItem from "./CommentItem";

@inject('stores')
@observer
class CommentViewList extends Component {
    render() {
        return(
            <div>
                {this.props.items.map(item => <CommentItem key={item.id} comment={item} />)}
            </div>
        );
    }
}

export default CommentViewList;