import {observable, action} from "mobx";
import axios from "axios";

class PostStore{
    static __instance = null;

    static getinstance(){
        if(PostStore.__instance === null){
            PostStore.__instance = new PostStore();
        }
        return PostStore.__instance;
    }

    constructor(){
        PostStore.__instance = this;
    }

    @observable Items = null;
    @action fetchItems = async () => {
        try{
            this.Items = null;
            let response = await axios({
                url : `http://localhost:8080/post`,
                method : "get",
                headers : {
                    'Content-type' : 'application/json;charset=UTF-8'
                },
                timeout : 3000
            });
            if(response.status === 200){
                this.Items = response.data;
            }
        }catch (ex) {
            console.log(ex);
        }
    };

    @observable viewItemByUser = null;
    @action fetchItemByUser = async (userId) => {
        try{
            this.viewItemByUser = null;
            let response = await axios({
                url : `http://localhost:8080/post/user/${userId}`,
                method : "get",
                headers : {
                    'Content-type' : 'application/json;charset=UTF-8'
                },
                timeout : 3000
            });
            if(response.status === 200){
                /*await setTimeout(
                    ()=> ,
                    3000
                )*/
                this.viewItemByUser = response.data;
            }
        }catch (ex) {
            console.log(ex);
        }
    };

    @observable viewItem = null;
    @action fetchItem = async (postId) => {
        try{
            this.viewItem = null;
            let response = await axios({
                url : `http://localhost:8080/post/${postId}`,
                method : "get",
                headers : {
                    'Content-type' : 'application/json;charset=UTF-8'
                },
                timeout : 3000
            });
            if(response.status === 200){
                /*await setTimeout(
                    ()=> ,
                    3000
                )*/
                this.viewItem = response.data
            }
        }catch (ex) {
            console.log(ex);
        }
    };

    @action addNewPost = async (post) => {
        try {
            let response = await axios({
                url : `http://localhost:8080/post`,
                method : "post",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(post)
            });

            return (response.status === 200);
        }catch (ex) {
            console.log(ex);
            return false;
        }
    };

    @action editPost = async (post) => {
        try {
            let response = await axios({
                url : `http://localhost:8080/post`,
                method : "put",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                timeout : 5000,
                data: JSON.stringify(post)
            });

            return (response.status === 200);
        }catch (ex) {
            console.log(ex);
            return false;
        }
    }

    @action deletePost = async (postId) => {
        try {
            let response = await axios({
                url : `http://localhost:8080/post/${postId}`,
                method : "delete",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                }
            });

            return (response.status === 200);
        }catch (ex) {
            console.log(ex);
            return false;
        }
    }
}

export default PostStore.getinstance();