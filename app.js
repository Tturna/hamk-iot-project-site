const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');
const path = require('path');
const express = require('express');
const app = express();
 
// const hostname = '127.0.0.1';
const sitePort = 3001;
const udpSendPort = 5001;
const udpSendIp = '192.168.112.70';

const onMessage = Buffer.from('1');
const offMessage = Buffer.from('0');
const client = dgram.createSocket('udp4');

function send_udp_onMessage()
{
  console.log("send on");
  client.send(onMessage, udpSendPort, udpSendIp, (err) => {
      // client.close();
  });
}

function send_udp_offMessage()
{
  console.log("send off");
  client.send(offMessage, udpSendPort, udpSendIp, (err) => {
      client.close();
  });
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  // res.end(`<button onClick="console.log('Message: Sent On Message!')">Send</button>`);
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/clickon', (req, res) => {
  console.log("sending on");
  send_udp_onMessage();
  res.sendStatus(201);
});

app.post('/clickoff', (req, res) => {
  console.log("sending off");
  send_udp_offMessage();
  res.sendStatus(201);
});
 
app.listen(sitePort, () => {
  console.log(`Server running at http://localhost:${sitePort}/`);
});