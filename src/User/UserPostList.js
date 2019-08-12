import React from 'react';
import UserPostListItem from "./UserPostListItem";

const UserPostList = (props)=> {
    console.log(props.items);
    return (
        <div>
            {props.items.map(item => <UserPostListItem key={item.id} post={item}/>)}
        </div>
    );


};

export default UserPostList;