import React    from 'react';
import ReactDom from 'react-dom/server';
import { getHeaders, initialize } from 'redux-oauth';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './redux/configureStore';
var router = require('express').Router();

router.use((req, res) => {
  const store = configureStore();

  return store.dispatch(initialize({
    backend: {
      apiUrl: '/api/login',
      authProviderPaths: {},
      signOutPath: null
    },
    cookies: req.cookies,
    currentLocation: req.url,
  }))
  .then(() => match({ routes: routes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      return res.status(500).send(error.message);
    }

    if (!renderProps) {
      return res.status(404).send('Not found');
    }


    const componentHTML = ReactDom.renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const state = store.getState();

    res.cookie('authHeaders', JSON.stringify(getHeaders(store.getState())), { maxAge: Date.now() + 14 * 24 * 3600 * 1000 });
    res.setHeader('Content-Type', 'text/html');
    return res.end(renderHTML(componentHTML, state));
  }));
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050/public' : '';

function renderHTML(componentHTML, initialState) {
  return `<!DOCTYPE html>
      <html>
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css' />
          <link rel="stylesheet" href="${assetUrl}/assets/styles.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/js/bootstrap.min.js"></script>
          <script type="application/javascript">
            window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
          </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

module.exports = router;
