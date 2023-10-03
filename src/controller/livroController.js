import { deleteBook, insertBook, selectBook, selectBooks, updateBook } from "../../db.js";

console.log(deleteBook);
class LivroController {
    
  static async listarLivros (req, res) {
    try {
      const listarLivros = await selectBooks();
      res.status(200).json(listarLivros);
    } catch (erro){
      res.status(500).json({message: `${erro.message} - falha na requisição`});
    }
  }

  static async listarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await selectBook(id);

      if(livroEncontrado.length != 0) {
        res.status(200).json(livroEncontrado);
      } else {
        res.status(400).send({message: "Id do livro não encontrado"});
      }

    } catch (erro){
      next(erro);
    }
  }

  static async cadastrarLivro (req, res) {
    try {
      const novoLivro = await insertBook(req.body);
      res.status(200).json({ message: "Criado com sucesso", livro:novoLivro});
    } catch (erro){
      res.status(500).json({message: `${erro.message} - falha ao cadastrar livro`});
    }
  }

  static async atualizarLivro (req, res) {
    try {
      const id = req.params.id;
      await updateBook(id, req.body);
      res.status(200).json({ message: "livro atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  }
    
  static async excluirLivro (req, res) {
    try {
      const id = req.params.id;
      await deleteBook(id);
      res.status(200).json({ message: "livro excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  }
}

export default LivroController;