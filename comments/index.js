import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { randomBytes } from 'crypto';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const comments = {}
app.get("/posts/:id/comments", (req, res) => {
    res.send(comments[req.params.id] || []);
});
app.post("/posts/:id/comments", (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comment = comments[req.body.id] || [];
    comment.push({id, content});
    comments[req.params.id] = comment;
    res.status(201).send(comment);
});

app.listen(4001, () => {
    console.log("Comments service is listening on 4001 port");
})