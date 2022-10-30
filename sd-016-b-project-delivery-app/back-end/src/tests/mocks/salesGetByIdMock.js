const decodedSeller = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
};

const decodedClient = {
  id: 3,
  name: 'Zé birita',
  email: 'fulana@deliveryapp.com',
  role: 'customer',
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwicm9sZSI6MiwiaWF0IjoxNjU3OTA3MTAzLCJleHAiOjE2NTc5MjUxMDN9.nScwj1IL8TtUhBVjSwgAqXA1X-oQbQqr07NExXw70Dg';

const salesById = {
  id: 43,
  userId: 3,
  sellerId: 2,
  totalPrice: '49.88',
  deliveryAddress: 'Rua de tal',
  deliveryNumber: '33',
  saleDate: '2022-07-15T20:31:49.000Z',
  status: 'Pendente',
  saleProduct: [
    {
      quantity: 4,
      product: {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: '2.49',
        urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
      },
    },
    {
      quantity: 8,
      product: {
        id: 7,
        name: 'Becks 330ml',
        price: '4.99',
        urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
      },
    },
  ],
};

module.exports = {
  decodedSeller,
  decodedClient,
  token,
  salesById,
};
