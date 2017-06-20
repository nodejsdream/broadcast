var router = require('express').Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
var request = require('request');

router.post('/login', function(req, response) {
  console.log(req.body);
  if (req.session.logined) {
    // return response.redirect(302, '/')
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({
      'data':req.session.user
    }));
  } else {
    try {
      var param = req.body,
          uri = 'https://dev.usedust.com/tw-server/oauth/token';
      request.post(uri,
        {
           form: {
             'username': param.userName,
             'password': param.password,
             'grant_type': 'password',
             'client_id': 'dust-web-client',
             'client_secret': 'password'
           }
         },
        function(err, answer, body) {
            console.log('body', body);
            try{
              var post = JSON.parse(body);
              console.log(post);
              if (!!post.error) {
                return response.status(401).send({ error: post.error })
              } else {
                req.session.logined = true;
                req.session.started = Date.now();
                req.session.access_token = post.access_token;
                req.session.jti = post.jti;
                response.setHeader('Content-Type', 'application/json');
                response.send(JSON.stringify({
                  'data':{userId:0}
                }));
              }
            } catch (e){
              console.log(e);
              req.session.logined = false;
              return response.status(401).send({ error: 'Something failed!' })

            }

        }
      );
    } catch (e) {
      console.log(e);
      response.redirect(302, '/login')
    }
  }
});

router.get('/logout', function(req, res) {
    req.session.logined = false;
    return res.status(200).send({ url: '/login' })
});

router.post('/a', function(req, res) {
    console.log(req.query);
    console.log(req.body);
    if (req.body.userName == "XXX") {
      req.session.logined = true;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ 'data':{ 'id':437, 'provider':'github',
        'uid':'26506623', 'name':null, 'nickname':'pelfor',
        'image':'https://avatars1.githubusercontent.com/u/26506623?v=3',
        'email':null
      } }));
    } else {
      return res.status(401).send({ error: 'Something failed!' })
    }

});

router.post('/signup', function(req, response) {
    console.log(req.body);
    var param = req.body;
    var data = '{"userName": "'   + param.userName + '",'+
               '"password": "'    + param.password + '",'+
               '"fullName": "'    + param.fullName + '",'+
               '"displayName": "' + param.displayName + '"'+
               '}';
    data = JSON.parse(data);
    var uri = 'https://dev.usedust.com/tw-server/accounts/create';
    request.post(uri,
      {
         form: {
           'username': param.userName,
           'password': param.password,
           'fullName': param.fullName,
           'displayName': param.displayName,
           'client_id': 'dust-web-client',
           'client_secret': 'password'
         }
       },
      function(err, answer, body) {
          try{
            var post = JSON.parse(body);
            if (!post.result){
              if (!!post.error && !!post.error.localizedMessage) {
                return response.status(401).send({ error: post.error.localizedMessage })
              } else {
                return response.status(401).send({ error: 'Something failed!' })
              }
            } else {
              req.session.logined = true;
              req.session.user = post.result.clientAccount;
              req.session.started = Date.now();
              req.session.access_token = post.clientAccount.token;
              req.session.accountId = post.clientAccount.accountId;
              response.setHeader('Content-Type', 'application/json');
              response.send(JSON.stringify({
                'data':post.clientAccount
              }));
            }
          } catch (e){
            return response.status(401).send({ error: 'Something failed!' })
          }

      }
    );
});

module.exports = router;
