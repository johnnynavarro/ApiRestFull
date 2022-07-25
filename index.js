const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect
  //Aqui vc precisa inserir informações de login do MonhoDB recomento o MongoDB Atlas
  //Tabém recomendo o ARQUIVO DOTENV para armazenar essas informações
  ()

  .then(() => {
    console.log({ message: "Conectado do DB" });
    app.listen(3000);
  })
  .catch((err) => console.log(err));

//22bvOBSYAgCvOhnK

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ServerUP!!!!" });
});
