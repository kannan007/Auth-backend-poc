const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { ApolloServer, gql, AuthenticationError } = require('apollo-server-express');
const DataLoader = require('dataloader');
const cors = require('cors');
require('dotenv').config();

const { PostsDataSource, UsersDataSource } = require('./gql/datasources');
const { postRest, userRest } = require('./logics');
const indexRouter = require('./routes/index');
const router = require('./routes/router');
const { Hello, Users, Posts } = require('./gql/schema');
const resolvers = require('./gql/resolvers');
const { verifyAndSendToken } = require('./middlewares');

const app = express();

app.use(cors());

mongoose.set('debug', true);

const server = new ApolloServer({
  typeDefs: [Hello, Users, Posts],
  resolvers,
  // context: ({ req }) => {
  //   try {
  //     const userAuth = verifyAndSendToken(req.headers['authorization']);
  //     return { userAuth };
  //   } catch (error) {
  //     throw new AuthenticationError(`Please send token`);
  //   }
  // },
  dataSources: () => {
    console.log('Inside datsource init');
    return {
      usersDataSource: new UsersDataSource(userRest),
      postsDataSource: new PostsDataSource(postRest),
    };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

// const userLoader = new DataLoader((keys) => myBatchGetUsers(keys));

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/api', router);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then((result) => console.log('DB connected'))
    .catch((err) => console.log(err));

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
});

module.exports = app;
