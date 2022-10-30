const decodedSeller = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkZ1bGFuYSBQZXJlaXJhIiwiZW1haWwiOiJmdWxhbmFAZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6MSwiaWF0IjoxNjU3OTA2OTg3LCJleHAiOjE2NTc5MjQ5ODd9.P7VnumHZmY35PSNmsOgN9OeUdlMaDJ-z_sLGzH1JeE4';

const salesBySeller = [
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: '10.00',
    deliveryAddress: 'Rua de tal',
    deliveryNumber: '33',
    saleDate: '2022-07-13T17:59:08.000Z',
    status: 'Pendente',
  },
  {
    id: 3,
    userId: 3,
    sellerId: 2,
    totalPrice: '15.00',
    deliveryAddress: 'Rua de tal',
    deliveryNumber: '33',
    saleDate: '2022-07-13T17:59:09.000Z',
    status: 'Pendente',
  },
  {
    id: 20,
    userId: 3,
    sellerId: 2,
    totalPrice: '20.00',
    deliveryAddress: 'Rua de tal',
    deliveryNumber: '33',
    saleDate: '2022-07-14T18:01:16.000Z',
    status: 'Pendente',
  },
];

module.exports = {
  decodedSeller,
  token,
  salesBySeller,
};
