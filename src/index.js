import express from 'express';
import path, { dirname } from 'path';
import * as db from './database.js';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const port = 8000

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/location', (req, res) => {
    console.log(req.body);
    db.saveLocation(req.body);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


