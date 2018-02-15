const bodyParser = require('body-parser')
const events = require('events')
const express = require('express')
const session = require('express-session')
// import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
const mongoose = require('mongoose')
const connectMongo = require('connect-mongo')

// import config from '../config.js';
// import passport from '../data/user/passport/index.js';
// import schema from '../data/schema.js';
const app = express();
const mongoStore = connectMongo(session);

declare var global:any
class Loader extends events.EventEmitter {
  // constructor() {
  //   super();
  // }
  init() {
    // const self = this;
    // mongoose.connect(config.DB_URL + '/' + config.DB_NAME);
    (mongoose as any).Promise = global.Promise
    app.use(bodyParser.json());
    app.use(
      session({
        secret: 'keyboard cat',
        saveUninitialized: true,
        resave: true,
        store: new mongoStore({ mongooseConnection: mongoose.connection })
      })
    );
    // app.use(passport.initialize());
    // app.use(passport.session());
    // app.use(
    //   '/' + config.GQL_URL_DIR,
    //   graphqlExpress((req, res) => {
    //     console.log('user: ', req && req.sessionID);
    //     return { schema, context: { req } };
    //   })
    // );
    // app.use('/graphiql', graphiqlExpress({ endpointURL: '/' + config.GQL_URL_DIR }));
    // app.listen(config.APP_PORT, () => {
    //   self.emit('server.loaded');
    //   console.log(`server listening at port ${config.APP_PORT}`);
    // });
  }
}

export default new Loader();
