const KEY = 'delivery-location';

export const setLocation = (deliveryLocation = { suburb: '', state: '', postCode: '' }) => {
  localStorage.setItem(KEY, JSON.stringify(deliveryLocation));
};

export const clearLocation = () => {
  localStorage.removeItem(KEY);
};

export const getLocation = () => {
  const deliveryLocation = localStorage.getItem(KEY);
  if (deliveryLocation) {
    return JSON.parse(deliveryLocation);
  }

  return {
    suburb: null,
    state: null,
    postCode: null,
  };
};
