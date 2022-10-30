db.produtos.find({
  $and: [{ nome: { $ne: "Big Mac" } }, { nome: { $ne: "McChicken" } }],
}, {
  _id: false,
  nome: true,
  curtidas: true,
  vendidos: true,
});