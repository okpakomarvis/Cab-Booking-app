const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/isAuth");
const {errorName, formatError } = require("./middleware/errorMiddleware");
const jwt = require('jsonwebtoken');


const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', (req, res) => {
    graphqlHttp(req =>({
        schema:graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true,
        context: { 
          errorName,
          user: req.userId
        },
        formatError: (err) => {
          return formatError.getError(err)
        }
    }))(req, res)
  });

module.exports = app;
