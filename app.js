import express from "express";
import 'dotenv/config';

const app = express();

app.use(express.json());


app.listen(process.env.PORT, (err) => {
  console.log(`server running successfully at - http://www.localhost:${process.env.PORT}`);
});