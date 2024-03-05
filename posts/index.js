import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { randomBytes } from 'crypto';

const app = express();
app.use(bodyParser.json());
app.use(cors());
const createdPosts = {}
app.get("/posts", (req, res) => {
    res.send(createdPosts);
});

app.post("/posts", (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req. body;
    createdPosts[id] = {
        id, title
    }

    res.status(201).send(createdPosts);

});

app.listen(4000, () => {
    console.log("Post is listening on 4000 port");
})