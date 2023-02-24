export function getAll(cookieName) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  let jsonObject = null;

  if (parts.length === 2) {
    jsonObject = parts
      .pop()
      .split(';')
      .shift();
    return jsonObject;
  }

  return null;
}

export function getString(cookieName) {
  return getAll(cookieName);
}

export function setString(cookieName, cookieString, expirationInSeconds, isDomainWide) {
  const d = new Date();
  let expires = null;

  if (expirationInSeconds === undefined || expirationInSeconds === null) {
    expirationInSeconds = 86400;
  }

  d.setTime(d.getTime() + expirationInSeconds * 1000);
  expires = d.toGMTString();

  let domain = '';
  if (isDomainWide && isDomainWide === true) {
    domain = ';domain=.electrolux.au';
  }

  document.cookie = [cookieName, '=', encodeURIComponent(cookieString), '; expires=', expires, '; path=/', domain].join('');
}

export function get(cookieName, jsonElementName) {
  const cookies = getAll(cookieName);
  try {
    const cookiesObj = JSON.parse(decodeURIComponent(cookies));

    if (!jsonElementName) {
      return cookiesObj;
    }

    if (cookiesObj) {
      return cookiesObj[jsonElementName];
    }
  } catch (e) {
  }
  return null;
}

export function set(cookieName, jsonObject, expirationInSeconds) {
  setString(cookieName, JSON.stringify(jsonObject), expirationInSeconds);
}

export function del(cookieName) {
  document.cookie = `${cookieName}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
