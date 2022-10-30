const decodedClient = {
  id: 3,
  name: 'Zé birita',
  email: 'fulana@deliveryapp.com',
  role: 'customer',
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwicm9sZSI6MiwiaWF0IjoxNjU3OTA3MTAzLCJleHAiOjE2NTc5MjUxMDN9.nScwj1IL8TtUhBVjSwgAqXA1X-oQbQqr07NExXw70Dg';

const salesByUser = [
  {
    id: 5,
    userId: 3,
    sellerId: 3,
    totalPrice: '10.00',
    deliveryAddress: 'Rua de tal',
    deliveryNumber: '33',
    saleDate: '2022-07-13T19:06:39.000Z',
    status: 'Pendente',
  },
  {
    id: 6,
    userId: 3,
    sellerId: null,
    totalPrice: '20.00',
    deliveryAddress: 'Rua de tal',
    deliveryNumber: '33',
    saleDate: '2022-07-13T19:11:19.000Z',
    status: 'Pendente',
  },
  {
    id: 7,
    userId: 3,
    sellerId: null,
    totalPrice: '20.00',
    deliveryAddress: 'Rua de tal',
    deliveryNumber: '33',
    saleDate: '2022-07-13T19:34:30.000Z',
    status: 'Pendente',
  },
  {
    id: 8,
    userId: 3,
    sellerId: null,
    totalPrice: '20.00',
    deliveryAddress: 'Rua de tal',
    deliveryNumber: '33',
    saleDate: '2022-07-13T19:35:23.000Z',
    status: 'Pendente',
  },
];

module.exports = {
  decodedClient,
  token,
  salesByUser,
};
