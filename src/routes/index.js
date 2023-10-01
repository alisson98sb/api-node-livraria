import livros from "./livrosRoutes.js";
import express from "express";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Teste"));

  app.use(express.json(), livros);
};

export default routes;