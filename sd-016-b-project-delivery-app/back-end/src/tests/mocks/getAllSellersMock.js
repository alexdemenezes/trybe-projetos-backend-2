const sellers = [
  {
    "id": 2,
    "name": "Fulana Pereira",
    "email": "fulanapereira@deliveryapp.com",
    "role": "seller"
  },
  {
    "id": 3,
    "name": "Fulana Santana",
    "email": "fulanasantana@deliveryapp.com",
    "role": "seller"
  },
  {
    "id": 4,
    "name": "Fulana Souza",
    "email": "fulanasouza@deliveryapp.com",
    "role": "seller"
  },
  {
    "id": 5,
    "name": "Fulano Silva",
    "email": "fulanasilva@deliveryapp.com",
    "role": "seller"
  },
];

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjU4MjU5NDI0LCJleHAiOjE2NTgyNzc0MjR9.yV5FN86OjxRu3OzXuT1_Vs9TG9CvQMarrSnvaqwGTzc";

const tokenData = {
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: "administrator",
}

module.exports = {
  sellers,
  token,
  tokenData,
}