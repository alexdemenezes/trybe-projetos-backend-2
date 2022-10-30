

const validData = {
  name: 'cristiano ronaldo',
  email: "cristiano@gmail.com",
  password: 'realmadrid'
}

const validDataByAdmin = {
  name: 'cristiano ronaldo',
  email: "cristiano@gmail.com",
  password: 'realmadrid',
  role: "customer"
}

const dataWithNameAlreadyUsed = {
  name: 'Fulana Pereira',
  email: "cristiano@gmail.com",
  password: 'realmadrid'
}

const adminDataWithNameAlreadyUsed = {
  name: 'Fulana Pereira',
  email: "cristiano@gmail.com",
  password: 'realmadrid',
  role: "customer"
}

const dataWithEmailAlreadyUsed = {
  name: 'Fulana 2 Pereira',
  email: "fulana@deliveryapp.com",
  password: 'fulana123'
}

const adminDataWithEmailAlreadyUsed = {
  name: 'Fulana 2 Pereira',
  email: "fulana@deliveryapp.com",
  password: 'fulana123',
  role: "customer"
}

const dataWithInvalidPassword = {
  name: 'cristiano ronaldo',
  email: "cristiano@gmail.com",
  password: 'real'
}

const dataWithInvalidEmail = {
  name: 'cristiano ronaldo',
  email: "cristianogmail.com",
  password: 'realmadrid123'
}

const dataWithInvalidName = {
  name: 'CR7',
  email: "cristiano@gmail.com",
  password: 'realmadrid123'
}

const dataWithoutEmail = {
  name: 'cristiano ronaldo',
  password: 'realmadrid'
}

const dataWithoutName = {
  email: "cristiano@gmail.com",
  password: 'realmadrid'
}

const dataWithoutPassword = {
  name: 'cristiano ronaldo',
  email: "cristiano@gmail.com",
}

const tokenDataCustomer = {
  id: 5,
  name: "Delivery App Admin",
  email: "customer@deliveryapp.com",
  role: "customer",
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjU4MjU5NDI0LCJleHAiOjE2NTgyNzc0MjR9.yV5FN86OjxRu3OzXuT1_Vs9TG9CvQMarrSnvaqwGTzc";

const tokenData = {
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: "administrator",
}

module.exports = {
  validData,
  dataWithEmailAlreadyUsed,
  dataWithNameAlreadyUsed,
  dataWithInvalidEmail,
  dataWithInvalidName,
  dataWithInvalidPassword,
  dataWithoutEmail,
  dataWithoutName,
  dataWithoutPassword,
  token,
  tokenData,
  validDataByAdmin,
  tokenDataCustomer,
  adminDataWithEmailAlreadyUsed,
  adminDataWithNameAlreadyUsed
}