import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {Provider} from "mobx-react";
import './App.scss';

import Stores from './Stores';
import User from './User';
import Home from './Home';
import Post from './Post';

function App() {
  return (
      <Provider stores={Stores}>
        <BrowserRouter>
          <header className='app-header'>
            <ul className='menu-bar'>
              <li> <Link to='/'>Home</Link> </li>
              <li> <Link to='/post/add'>글쓰기</Link></li>
              <li> <Link to='/user'>내정보</Link> </li>
            </ul>
          </header>

          <section className='app-body'>
              <Route path='/user/:command?' exact component={User}/>
              <Route path='/' exact component={Home} />
              <Route path='/post/:command?/:index?' exact component={Post}/>
          </section>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
