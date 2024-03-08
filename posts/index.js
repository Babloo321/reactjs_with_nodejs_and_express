// import express from 'express';
// import bodyParser from 'body-parser';
// import { randomBytes } from 'crypto';
// import cors from 'cors';
// import axios from 'axios';
// const port = 4000;
// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// const posts = {};
// app.get("/posts", (req,res) => {
//     res.send(posts);
// });

// app.post("/posts", async (req, res) => {
//     const id = randomBytes(4).toString("hex");
//     const {title} = req.body;
//     posts[id] = {
//         id, title
//     }

//     await axios.post("http://localhost:4005/events", {
//         type: "PostCreated",
//         data: {
//             id, title
//         }
//     });
//     res.status(201).send(posts[id]);
// });

// app.post("/events", (req, res) => {
//     console.log("Received Event ", req.body.type);

//     res.send({});
// })

// app.listen(port, () => {
//     console.log(`Posts Service is Listening on ${port} port`);
// })

import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(`This output is inside Post Service:: ${posts[id]}`);
});

app.post("/events", (req, res) => {
  console.log("Received Event from Event bus inside Post Service:: ", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
