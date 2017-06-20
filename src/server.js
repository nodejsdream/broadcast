var express = require('express');
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');

const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'password',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: 'mongodb://localhost:27017/dust-web-client' })
}));
app.use(express.static('public'));

app.use(function(req, res, next){
  res.locals._GET = function (uri, params, next){
    return request({
        'auth': {
            'bearer': req.session.access_token
          },
        uri: "https://dev.usedust.com/tw-server/" + uri,
        method: 'GET'
      }, function (err, rest, body) {
        if (!!err) {
          console.log(e);
          return next(err, null);
        }
        return next(null, body);
      });
  };
  res.locals._POST = function (uri, params, next){
    return request({
        'auth': {
            'bearer': req.session.access_token
          },
        uri: "https://dev.usedust.com/tw-server/" + uri,
        form: params,
        method: 'POST'
      }, function (err, rest, body) {
        if (!!err) {
          console.log(e);
          return next(err, null);
        }
        return next(null, body);
      });
  };
  next();
});

app.use('/api',require('./api.jsx'));
app.use('/',require('./browser.jsx'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
