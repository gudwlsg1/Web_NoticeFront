import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@inject('stores')
@observer
class PostAdd extends Component {
    state = {
        userId : 1,
        title : '',
        content : '',
        goToList: false,
        goToPost: false,
        id : -1
    };

    constructor(props){
        super(props);
        if(this.props.postid && this.props.stores.PostStore.viewItem){
            let post = this.props.stores.PostStore.viewItem;
            this.state = {
                ...this.state,
                title : post.title,
                content : post.content,
                id : post.id
            }
        }
    }

    render(){
        if(this.state.goToList){
            return <Redirect to='/'/>
        }
        if(this.state.goToPost){
            return <Redirect to={`/post/view/${this.props.postid}`}/>
        }
        return(
            <div>
                <div>
                    <input value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <div>
                    <CKEditor editor={ClassicEditor}
                              data={this.state.content}
                              onChange={this.updateContent}
                              config={{
                                ckfinder : { uploadUrl: "http://localhost:8080/attachment" }
                              }}/>
                </div>
                <div>
                    <button>파일 선택</button>
                </div>
                <div>
                    <button onClick={this.addNewPost}>확인</button>
                </div>
            </div>
        );
    }

    updateTitle = event => {
        this.setState({
            ...this.state,
            title : event.target.value
        });
    };

    updateContent = (event, editor) => {
        this.setState({
            ...this.state,
            content : editor.getData()
        });
    };

    addNewPost = async ()=> {
        await this.setState({
            userId : this.props.stores.UserStore.user_data.id
        });

        if(this.props.postid && await this.props.stores.PostStore.editPost(this.state)){
            await this.props.stores.PostStore.fetchItems();
            await this.setState({
                ...this.state,
                goToPost: true
            });
        }else if(await this.props.stores.PostStore.addNewPost(this.state)){
            await this.props.stores.PostStore.fetchItems();
            await this.setState({
                ...this.state,
                goToList: true
            });
        }
    }
}

export default PostAdd;