const decodedSeller = {
  id: 2, 
  name: "Fulana Pereira", 
  email: "fulana@deliveryapp.com", 
  role: 'seller'
}

const decodedClient = {
  id: 3, 
  name: "Zé birita", 
  email: "fulana@deliveryapp.com", 
  role: 'customer'
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOjAsImlhdCI6MTY1NzkxMDM5MSwiZXhwIjoxNjU3OTI4MzkxfQ.AR5BxcXrvucc3diwMR8SUBUOAwuyPWbGhZeOS8it1Uk"

const sellerPreparando = {
  status: 'Preparando',
  saleId: 1
}

const sellerTransito = {
  status: 'Em Trânsito',
  saleId: 1
}

const clientEntregue = {
  status: 'Entregue',
  saleId: 1
}

module.exports = {
  decodedSeller,
  token,
  sellerPreparando,
  sellerTransito,
  decodedClient,
  clientEntregue,
}