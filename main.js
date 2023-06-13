const express = require('express');
const session = require('express-session');
const todolistController = require('./todolistController.js');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.json());
app.use(session({
	secret: 'supersecret',
	resave: false,
	saveUninitialized: true,
	cookie: {}
}));

app.get('/tasks', todolistController.getTasks);
app.post('/tasks', todolistController.postTasks);

app.get('/tasks/:id', todolistController.getTaskId);
app.put('/tasks/:id', todolistController.putTaskId);
app.delete('/tasks/:id', todolistController.deleteTaskId);

app.get('/verify', todolistController.getSession);
app.post('/login', todolistController.postSession);
app.delete('/logout', todolistController.deleteSession);

app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});