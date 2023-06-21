import express from 'express';
import path from 'path';

import { getServerJson, getServerByName } from './api';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/build/public')));

app.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'main.js'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'homepage.html'));
});

app.get('/server', (req, res) => {
  const name: string = req.query.name as string;

  if (typeof name === 'string') {
    getServerByName(name).then(Server => {
      if (Server !== undefined) {
        res.send(Server)
      } else {
        res.status(400).send("Server does not exist.")
      }
    })
  } else {
    res.status(400).send("Invalid name provided.")
  }
});

app.get('/servers', (req, res) => {
  getServerJson().then(Data => {
    res.send(Data)
  })
})

app.get('/images', (req, res) => {
  var file: string | string[] = req.query.path as string;
  file = file.split('/');

  res.sendFile(path.join(__dirname, '/public', 'images', file[0], file[1]))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//190-J8-02