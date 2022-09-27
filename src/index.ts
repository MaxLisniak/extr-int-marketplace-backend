import Debug from "debug";
import http from 'http';
const debug = Debug('express:server');
import app from './app';

const port = parseInt(process.env.PORT);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
