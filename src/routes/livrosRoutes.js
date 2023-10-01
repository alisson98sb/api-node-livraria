import express from "express";
import LivroController from "../controller/livroController.js";


const routes = express.Router();

routes.get("/livros", LivroController.listarLivros);
routes.get("/livro/:id", LivroController.listarLivroPorId);
routes.post("/livro", LivroController.cadastrarLivro);
routes.put("/livro/:id", LivroController.atualizarLivro);
routes.delete("/livro/:id", LivroController.excluirLivro);

export default routes;