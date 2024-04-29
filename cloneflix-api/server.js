const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/cloneflix")
  .then(() => {
    console.log("Banco Conectado");
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
  });

app.use("/api/user", userRoutes);

app.listen(5000, console.log("rodando..."));
