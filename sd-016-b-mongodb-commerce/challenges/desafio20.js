db.produtos.updateOne(
  { nome: "Quarteirão com Queijo" },
  {
    $pop: { ingredientes: -1 }, // remove o primeiro ou o ultimmo elemento do array, valor -1 informa que é o primeiro
  },
);

db.produtos.find(
  {},
  {
    _id: false,
    nome: true,
    ingredientes: true,
  },
);