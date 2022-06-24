const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const http = require('http');

const { connectDB,logger, keys } = require('./config'); 
// const routeParser = require('./parse-routes');
const errorHanlder = require('./middleware/errorMiddleware');
const app = express();


// const seedservice = require('./services/seed.service'); // check it later

connectDB();

app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
// app.use('/images', express.static('uploads', {}));
// express.static.mime.define({
//   png: [''],
// }); //check it later



app.use(cors());

// addCPRoutes(app);
// seedservice();


app.use(errorHanlder);

app.set('port', keys.port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${keys.port}`
    : `Port ${keys.port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  logger.info('Listenign on ', bind);
};

server.listen(keys.port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = server;
