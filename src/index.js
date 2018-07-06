/* eslint-disable no-console */

import express from 'express';
import { createServer } from 'http';

import './config/db';
import middlewares from './config/middlewares';
import constants from './config/constants';

const app = express();
middlewares(app);

const graphQLServer = createServer(app);

graphQLServer.listen(constants.PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listen in port : ${constants.PORT}`);
  }
});
