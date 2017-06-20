import React from 'react';
import { Route, IndexRoute }  from 'react-router';
import App from 'components/App';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Post from 'components/Post';
import About from 'components/About';
import MainFeed from 'components/MainFeed';
import { isUserSignedIn } from 'redux/models/user';

function requireAuth(nextState, transition, cb) {
  setTimeout(() => {
    if (!isUserSignedIn(store.getState())) {
      transition('/');
    }
    cb();
  }, 0);
}

let store;

export default function routes(storeRef) {
  store = storeRef;

  return (
    <Route component={App} path='/'>
      <IndexRoute component={About} />
      <Route component={Login} path='login' />
      <Route component={Signup} path='signup' />
      <Route component={About} path='about' />
      <Route component={Login} path='logout' />
      <Route component={MainFeed} path='MainFeed' />
      <Route component={About} path='secured' onEnter={requireAuth} />
    </Route>
  );
}
