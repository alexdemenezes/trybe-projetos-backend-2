db.resumoProdutos.insert({
  franquia: "McDonalds",
  totalProdutos: db.produtos.count(),
});

db.resumoProdutos.find({}, { _id: false });