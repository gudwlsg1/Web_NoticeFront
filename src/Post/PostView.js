import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';
import CommentViewList from "./CommentViewList";

@inject('stores')
@observer
class PostView extends Component {
    state = {
        goToList: false,
        goToEdit : false,
        content : '',
        postId : -1,
        userId : -1
    };

    componentDidMount() {
        this.props.stores.PostStore.fetchItem(this.props.postId);
        this.props.stores.CommentStore.fetchItems(this.props.postId);
    }

    render() {

        if(this.state.goToList){
            return <Redirect to='/'/>
        }
        if(this.state.goToEdit){
            return <Redirect to={`/post/edit/${this.props.postId}`} />
        }
        let p = this.props.stores.PostStore;
        let u = this.props.stores.UserStore;
        if(!p.viewItem){
            return <div/>;
        }
        return(
            <div>
                <div>
                    제목 : {p.viewItem.title}
                </div>
                <div dangerouslySetInnerHTML={{__html: p.viewItem.content}} />
                <div>
                    작성시간 : {new Date(p.viewItem.created).toLocaleString()}
                </div>
                <div>
                    글쓴이 : {p.viewItem.nickname === undefined ? "익명" : p.viewItem.nickname}
                </div>
                <div> <input placeholder='댓글' onChange={this.updateComment}/> <button onClick={this.AddComment}>확인</button> </div>
                <div>{this.props.stores.CommentStore.Item && <CommentViewList items={this.props.stores.CommentStore.Item}/>}</div>
                <div>
                    <Link to='/'>목록</Link>
                    {u.user_data && p.viewItem.userId === u.user_data.id && <button onClick={this.updatePost}>수정</button>}
                    {u.user_data && p.viewItem.userId === u.user_data.id && <button onClick={this.deletePost}>삭제</button>}
                </div>
            </div>
        );
    }

    updatePost = () => {
        if(window.confirm("수정하시겠습니까?") === false) return;

        if(this.props.stores.PostStore.viewItem.userId !== this.props.stores.UserStore.user_data.id){
            return;
        }

        this.setState({
            goToEdit : true
        })
    };

    updateComment = event => {
        this.setState({
            content : event.target.value
        });
    };

    AddComment = async () => {
        if(!this.props.stores.UserStore.user_data){
            alert('로그인 후 이용해주세요!');
            return;
        }

        if(this.state.postId === -1){
            await this.setState({
                postId : this.props.postId
            })
        }

        if(this.state.userId === -1){
            await this.setState({
                userId : this.props.stores.UserStore.user_data.id
            })
        }
        if(await this.props.stores.CommentStore.addComment(this.state)){

        }
    }

    deletePost = async () => {
        if(window.confirm("삭제하시겠습니까?") === false) return;

        if(this.props.stores.PostStore.viewItem.userId !== this.props.stores.UserStore.user_data.id){
            return;
        }

        if(this.props.postId){
            if(await this.props.stores.PostStore.deletePost(this.props.postId)){
                await this.props.stores.PostStore.fetchItems();
                this.setState({
                    goToList : true
                })
            }
        }
    }
}

export default PostView;