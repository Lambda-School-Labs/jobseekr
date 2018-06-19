const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes/routes.js');

const user = process.env.USER;
const pass = process.env.PASSWORD;

const server = express();
server.use(express.json());
const PORT = process.env.PORT || 5000;

server.use(express.static(path.join(__dirname, '/FrontEnd/build')));

server.use(morgan('combined'));
server.use(helmet());
server.use(cors({
  origin: 'https://ls-jobseekr1.herokuapp.com/',
  credentials: true,
  methods: ['GET', 'PUT', 'POST'],
}));
server.options('*', cors());

routes(server);

mongoose
  .connect(`mongodb://${user}:${pass}@ds163650.mlab.com:63650/jobseekr`)
  .then((result) => {
    console.log('Mongo Connected');
  })
  .catch((error) => {
    console.log('Error connecting to Mongo.');
  });

server.listen(5000, () => console.log(`Server is Listening on port: ${PORT}`));