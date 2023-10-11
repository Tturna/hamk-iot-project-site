const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');
const path = require('path');
const express = require('express');
const app = express();
 
// const hostname = '127.0.0.1';
const sitePort = 3001;
const udpSendPort = 5001;
const udpReceivePort = 5000;
const udpSendIp = '192.168.112.15';

const onMessage = Buffer.from('1');
const offMessage = Buffer.from('0');
const client = dgram.createSocket('udp4');

let recMsg = null;

function send_udp_onMessage()
{
  recMsg = null;
  console.log("send on");
  client.send(onMessage, udpSendPort, udpSendIp, (err) => {
      // client.close();
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`RecMsg: ${recMsg}`);
      resolve(recMsg != null);
    }, 2000);
  });
}

async function send_udp_offMessage()
{
  console.log("send off");
  client.send(offMessage, udpSendPort, udpSendIp, (err) => { });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`RecMsg: ${recMsg}`);
      resolve(recMsg != null);
    }, 2000);
  });
}

function close_connection()
{
  client.close();
}

client.on('message', (msg, rinfo) => {
  console.log(`Received: '${msg}' from ${rinfo.address}:${rinfo.port}`);
  recMsg = msg;
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  // res.end(`<button onClick="console.log('Message: Sent On Message!')">Send</button>`);
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/clickon', (req, res) => {
  console.log("sending on");
  successPromise = send_udp_onMessage();

  successPromise.then((success) => {
    console.log(`success: ${success}`);

    if (success)
    {
      console.log(`Received message: ${recMsg}`);
      res.status(200);
      res.send("Starting...");
    }
    else{
      res.sendStatus(500);
    }
  });
});

app.post('/clickoff', async (req, res) => {
  console.log("sending off");
  successPromise = send_udp_offMessage();

  successPromise.then((success) => {
    console.log(`success: ${success}`);

    if (success)
    {
      console.log(`Received message: ${recMsg}`);
      res.status(200);
      res.send("Stopping...");
    }
    else{
      res.sendStatus(500);
    }
  });
});

app.post('/clickclose', (req, res) => {
  console.log('server closing connection...');
  close_connection();
  res.sendStatus(201);
});
 
client.bind(udpReceivePort);

app.listen(sitePort, () => {
  console.log(`Server running at http://localhost:${sitePort}/`);
});