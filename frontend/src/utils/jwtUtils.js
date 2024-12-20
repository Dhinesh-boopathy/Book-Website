export const parseJwt = (token) => {
  if (!token || typeof token !== 'string') {
    console.error('Invalid token provided');
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    console.error('Invalid JWT structure');
    return null;
  }

  try {
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
