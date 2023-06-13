const express = require('express');
const session = require('express-session');
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

app.get('/tasks', todolistController.gettasks());
app.get('/tasks/:id', todolistController.gettasksId());
app.post('/tasks', todolistController.posttasks());
app.put('/tasks/:id', todolistController.putTaskId());
app.delete('/task/:id', todolistController.putTaskId());

app.get('/verify', todolistController.getSession());
app.post('/login', todolistController.postSession());
app.delete('/logout', todolistController.deleteSession());

app.listen(port, () => {
  console.log('Example app listening on port ' + port);
});