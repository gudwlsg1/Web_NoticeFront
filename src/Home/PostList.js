import React from 'react';
import PostListItem from "./PostListItem";

const PostList = (props)=> {
    console.log(props.items);
    return (
        <div>
            {props.items.map(item => <PostListItem key={item.id} post={item}/>)}
        </div>
    );


};

export default PostList;