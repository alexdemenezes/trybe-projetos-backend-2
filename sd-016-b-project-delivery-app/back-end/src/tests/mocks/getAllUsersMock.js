const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjU4MjU5NDI0LCJleHAiOjE2NTgyNzc0MjR9.yV5FN86OjxRu3OzXuT1_Vs9TG9CvQMarrSnvaqwGTzc";

const tokenData = {
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: "administrator",
}

const clientData = {
  id: 2,
  name: "Client",
  email: "client@deliveryapp.com",
  role: "customer",
}

const users = [
  {
    id: 1,
    name: "Delivery App Admin",
    email: "adm@deliveryapp.com",
    password: "a4c86edecc5aee06eff8fdeda69e0d04",
    role: "administrator"
  },
  {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    password: "1c37466c159755ce1fa181bd247cb925",
    role: "customer"
  }
];

module.exports = {
  token,
  tokenData,
  users,
  clientData,
}