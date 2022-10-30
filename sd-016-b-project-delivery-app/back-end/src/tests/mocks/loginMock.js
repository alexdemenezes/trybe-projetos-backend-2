const credentials = {
  email: "adm@deliveryapp.com",
  password: "--adm2@21!!--",
}

const wrongCredentials = {
  email: "email@email.com",
  password: "12345678"
}
const invalidEmailField = {
  email: "test.com.br",
  password: "123456789"
}

const invalidPasswordField = {
  email: "test@gmail.com",
  password: "123"
}

const user = {
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 0
}

const loginData = {
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: 0,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOjAsImlhdCI6MTY1NzkxMDM5MSwiZXhwIjoxNjU3OTI4MzkxfQ.AR5BxcXrvucc3diwMR8SUBUOAwuyPWbGhZeOS8it1Uk"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOjAsImlhdCI6MTY1NzkxMDM5MSwiZXhwIjoxNjU3OTI4MzkxfQ.AR5BxcXrvucc3diwMR8SUBUOAwuyPWbGhZeOS8it1Uk"


module.exports = {
  credentials,
  wrongCredentials,
  loginData,
  token,
  user,
  invalidEmailField,
  invalidPasswordField,
}
