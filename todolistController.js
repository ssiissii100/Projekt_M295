const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.json());
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

const mail = 'test.user@example.ch';
const password = 'test';

const tasks = [];

/*All Tasks*/
exports.getTasks = (request, response)  =>{

};


exports.postTasks = (request, response)  =>{


};

/*Individual Tasks*/

exports.getTaskId  = (request, response)  =>{

  };

exports.putTaskId  = (request, response)  =>{

};

/*Session functions*/

exports.deleteTask = (request, response)  =>{

};

exports.getSession  = (request, response)  =>{


};

exports.postSession  = (request, response)  =>{

};

exports.deleteSession  = (request, response)  =>{


};