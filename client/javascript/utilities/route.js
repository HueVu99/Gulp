const getParam = (param) => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  return params.get(param);
};

const onChange = (cb) => {
  window.addEventListener('popstate', cb);
};

const getQueryString = () => window.location.search;

export const route = {
  getParam,
  onChange,
  getQueryString,
};
