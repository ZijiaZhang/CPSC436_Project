import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
console.log(path.join(__dirname, 'public'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
