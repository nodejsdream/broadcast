# Dust React Isomorphic server

Cyberdust webapp ;)
You can find here integrated React with Redux and Router, implemented authentication and all is isomorphic so Server Side Rendering works great. Dev server works with hot reloading.

Go below to read about all used tools and technology.

## Install and run

After clone repository you need to run:

* `npm install`
* `npm run build` for build files
* `npm start` and go to page `http://localhost:3000` for dev server

### Available commands

* `npm run build` - compiling files (files version for production `NODE_ENV=production`)
* `npm run server` - running simple node server
* `npm run serve [-- --api_uri]` - running hot dev server (default on `http://localhost:3000`) - you can use `api_uri` parameter to change `api_uri` config value (example: `npm run serve -- --api_uri=http:\/\/localhost:8080\/api\/v1\/`)
* `npm run test` - running mocha tests

Check `package.json` for aliases.

## About

### Todo

* [x] Add isomorphic pre-fetching data
    * [ ] Maybe change pre-fetching data to use decorators
* [ ] Internationalization
* [x] Authorization (for pages/components)
* [ ] Write tests
* [ ] Better documentation

### Structure

```
.
├── bin                        # Scripts for npm run
├── public                     # All built files (At this address should indicate the URL)
│   ├── css                    # Ready css file
│   └── img                    # Global image asset
├── routes                     # Application routes definitions
│   ├── api.js                 # Server api
│   ├── browser.js             # Browser api
│   └── routes.js              # Application routes definitions
├── views                      # Application component
│   ├── About.js               # About page
│   ├── Index.js               # Index page
│   ├── Login.js               # Login page
│   ├── Index.js               # Index page
│   └── Signup.js              # Signup page
├── server.js                  # Application server root file
├── config.js                  # Base config file - used by Webpack, Babel, Webpack Isomorphic Tools, SSR and more
└── webpack-config.js          # Config file for Webpack
```

### Used Tools

* `webpack` - https://webpack.github.io
* `babel` - https://babeljs.io
* `mocha` - https://mochajs.org
* `chai` - http://chaijs.com

### Used Technology

* 👀 `react` (JSX) - https://facebook.github.io/react
* 🐘 `redux` - https://github.com/rackt/redux
* 🚄 `express` - http://expressjs.com
* 🖌 Very basic CSS support - going to `sass` (`node-sass`) - http://sass-lang.com
* 🌍 Server Side Rendering.
* 📦 All source is bundled using Webpack v2.
* 🔀`react-router` - https://github.com/rackt/react-router
* 🚀 `ES2015/ES2016` (babel; ES6; ES7) - https://babeljs.io/docs/learn-es2015
* ⛑ SEO friendly - `react-helmet` provides control of the page title/meta/styles/scripts.



### Tested on

* node `>=6.10.0`
* npm `>=3.10.10`

### License

The MIT License (MIT)
