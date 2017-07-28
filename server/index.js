const express = require('express');
const path = require('path');
const fs = require('fs');
const merge = require('merge');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  fs.readFile(__dirname + '/data.json', function(err, file) {
  	res.send(file);		
  });
});

app.post('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  fs.readFile(__dirname + '/data.json', function(err, file) {
  	file = JSON.parse(file);
  	const newFile = merge(file, req.body.newState)
  	fs.writeFile(__dirname + '/data.json', newFile, function(err) {
  		res.send(newFile);		
  	})
  });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
