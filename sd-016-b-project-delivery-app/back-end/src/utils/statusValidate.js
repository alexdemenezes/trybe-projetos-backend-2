const statusValidatorSeller = (role, status) => {
  if (role === 'seller' && (status === 'Preparando' || status === 'Em Trânsito')) {
    return true;
  }
  return false;
};

const statusValidatorClient = (role, status) => {
  if (role === 'customer' && (status === 'Entregue')) {
    return true;
  }
  return false;
};

module.exports = { statusValidatorClient, statusValidatorSeller };