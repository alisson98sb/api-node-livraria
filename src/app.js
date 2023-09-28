import express from "express";
import { deleteBook, insertBook, selectBook, selectBooks, updateBook } from "../db.js";

const app = express();
app.use(express.json());


// function buscaLivro(id) {
//     return livros.findIndex(livro => {
//         return livro.id == Number(id);
//     })
// }


// app.get("/", (req, res) => {
//     res.status(200).send("Curso de node.js");
// })

app.get("/livros", async(req, res) => {
    const livros = await selectBooks();
    res.status(200).json(livros);
})

app.get("/livro/:id", async(req, res) => {
    const livro = await selectBook(req.params.id);
    res.status(200).json(livro);
})

app.post("/livros", async(req, res) => {
    await insertBook(req.body);
    res.sendStatus(201);
})

app.put("/livro/:id", async(req, res) => {
    await updateBook(req.params.id, req.body);
    res.sendStatus(200);
})

app.delete("/livro/:id", async(req, res) => {
    await deleteBook(req.params.id);
    res.sendStatus(200);
})

export default app;