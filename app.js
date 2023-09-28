const http = require('http');
const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');
 
const hostname = '127.0.0.1';
const sitePort = 3001;
const udpSendPort = 5001;
const udpSendIp = '';

const message = Buffer.from('1');
const client = dgram.createSocket('udp4');

function send_udp_on()
{
    client.send(message, udpSendPort, udpSendIp, (err) => {
        client.close();
    });
}
 
const test = "lmao";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<button onClick="console.log('Message: ${test}!')">Send</button>`);
});
 
server.listen(sitePort, hostname, () => {
  console.log(`Server running at http://${hostname}:${sitePort}/`);
});