/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';

import constants from './config/constants';
import './config/db';

const app = express();

app.use(bodyParser.json());

app.listen(constants.PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listen in port : ${constants.PORT}`);
  }
});
