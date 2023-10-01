import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

async function connect() {
  if(global.connection){
    return global.connection.connect();
  }


  const pool = new Pool({
    user: process.env.PG_USER,
    host: "localhost",
    database: "books-api",
    password: process.env.PG_PASSWORD,
    port: 5432, // Porta padrão do PostgreSQL
  });

  const client = await pool.connect();
  console.log("Criou o pool de conexão");

  // const res = await client.query("select now()");
  // console.log(res.rows[0])
  client.release();

  global.connection = pool;
  return pool.connect();
}

connect();


async function selectBooks(){
  const client = await connect();
  const res = await client.query("SELECT * FROM node_livros");
  return res.rows;
}

async function selectBook(id){
  const client = await connect();
  const sql = "SELECT * FROM node_livros WHERE id=$1";
  const values = [id];
  const res = await client.query(sql, values);
  return res.rows;
}

async function insertBook(customer){
  const client = await connect();
  const sql = "INSERT INTO node_livros(id, titulo, autor) VALUES ($1, $2, $3)";
  const values = [customer.id, customer.titulo, customer.autor];
  await client.query(sql, values);
}

async function updateBook(id, customer){
  const client = await connect();
  const sql = "UPDATE node_livros SET titulo=$1, autor=$2 WHERE id=$3";
  const values = [customer.titulo, customer.autor, id];
  await client.query(sql, values);
}

async function deleteBook(id){
  const client = await connect();
  const sql = "DELETE from node_livros WHERE id=$1";
  const values = [id];
  await client.query(sql, values);
}

export {selectBooks, selectBook, insertBook, updateBook, deleteBook};