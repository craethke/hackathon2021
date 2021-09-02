import express from 'express';
import fs from 'fs';
import https from 'https';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as db from './database.js';


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const port = 8000

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/locations', (req, res) => {
    const locations = db.getLocations();
    console.log('locations: ' + locations);
    res.json(locations);
});

app.post('/location', (req, res) => {
    console.log(req.body);
    db.saveLocation(req.body);
})

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// });

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const httpsServer = https.createServer(options, app);
httpsServer.listen(port);
