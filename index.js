const express = require('express'),
     http = require('http'),
     morgan = require('morgan'), //morgan is used to log the information to the screen, we can see the info about incoming requests 
     bodyParser = require('body-parser'); 

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

app.use(morgan('dev'));
app.use(bodyParser.json()); //will allow us to parse the body of req method given in JSON format

app.all('/dishes', (req, res, next) => { //this will be invoked for all requests from /dishes endpoint (no matter if its GET, POST, PUT, DELETE. All requests from /dishes will be handled here)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next(); //will pass the req res params for /dishes endpoint to next method, which is in our case is app.get for /dishes
});

//since next() is called ubove, the modified params req, res will be used below
app.get('/dishes', (req, res, next) => {
  res.end('Will send you back all the dishes soon');
})

//since next() is called ubove, the modified params req, res will be used below
app.post('/dishes', (req, res, next) => {
  res.end('Will add the dishes: ' + req.body.name + ' with details ' + req.body.description);
})

//since next() is called ubove, the modified params req, res will be used below
app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT method is not supported on /dishes');
})

app.delete('/dishes', (req, res, next) => {
  res.end('Will delete all the dishes');
})


/* Another endpoint */

//since next() is called ubove, the modified params req, res will be used below
app.get('/dishes/:dishId', (req, res, next) => {
  res.end('Will send you back details of the dish: ' + req.params.dishId);
})

//since next() is called ubove, the modified params req, res will be used below
app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST method is not supported on /dishes/'+ req.params.dishId);
})

//since next() is called ubove, the modified params req, res will be used below
app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('will update the dish: ' + req.body.name + ' with details ' + req.body.description);
})

app.delete('/dishes/:dishId', (req, res, next) => {
  res.end('Deleting dish: ' + req.params.dishId);
})



const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});