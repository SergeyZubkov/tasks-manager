const express = require('express');
const path = require('path');
const fs = require('fs');
const merge = require('merge');
const connect = require('./db/connect');
const userCtrl = require('./db/controllers').user;
const taskCtrl = require('./db/controllers').task;
const clientCtrl = require('./db/controllers').client;
const passport = require('passport');
const bodyParser = require('body-parser');
const initPassport = require('./initPassport');

const app = express();
const PORT = process.env.PORT || 5000;

connect();
// tell the app to parse HTTP body messages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

initPassport();

app.use(passport.initialize());





app.post('/login', userCtrl.login);
app.get('/checkAuth', userCtrl.checkAuth);

app.get('/api/users', userCtrl.getAll);
app.post('/api/users', userCtrl.signUp);
app.delete('/api/users/:id', userCtrl.delete);
app.put('/api/users/:id', userCtrl.update);

app.get('/api/tasks', taskCtrl.getAll);
app.post('/api/tasks', taskCtrl.add);
app.delete('/api/tasks/:id', taskCtrl.remove);
app.put('/api/tasks/:id', taskCtrl.update);
app.post('/api/tasks/:id/comment', taskCtrl.addComment);

app.get('/api/clients', clientCtrl.getAll);
app.post('/api/clients', clientCtrl.add);
app.delete('/api/clients/:id', clientCtrl.remove);
app.put('/api/clients/:id', clientCtrl.update);


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
