const express = require('express'),
  http = require('http'),
  morgan = require('morgan'), //morgan is used to log the information to the screen, we can see the info about incoming requests 
  bodyParser = require('body-parser'); 
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json()); //will allow us to parse the body of req method given in JSON format

/* We now have created a grp for all the routes of /dishes. remember that dishRouter is a mini-express app itself */
app.use('/dishes', dishRouter);
app.use('/promos', promoRouter);
app.use('/leaders', leaderRouter);

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});