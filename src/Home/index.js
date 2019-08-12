import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import PostList from "./PostList";

@inject('stores')
@observer
class Home extends Component {
    componentDidMount() {
        this.props.stores.PostStore.fetchItems();
    }

    render() {
        let p = this.props.stores.PostStore;
        return (
            <div>
                {p.Items && <PostList items={p.Items}/>}
            </div>
        )
    }
}

export default Home;