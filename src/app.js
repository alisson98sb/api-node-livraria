import express from "express";
import routes from "./routes/index.js";

const app = express();
routes(app);

//middlewares do express
// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next) => {
  res.status(500).send({message: "erro interno do servidor"});
});

export default app;