// Service d'authentification JWT pour React
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Login: récupère access et refresh tokens
export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  localStorage.setItem('access', data.access);
  localStorage.setItem('refresh', data.refresh);
  return data;
}

// Logout: supprime les tokens
export function logout() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}

// Refresh le token access
export async function refreshToken() {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) throw new Error('No refresh token');
  const response = await fetch(`${API_URL}/auth/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh })
  });
  if (!response.ok) throw new Error('Refresh failed');
  const data = await response.json();
  localStorage.setItem('access', data.access);
  return data.access;
}

// Wrapper fetch qui ajoute automatiquement le JWT
export async function apiFetch(url, options = {}) {
  let access = localStorage.getItem('access');
  if (!options.headers) options.headers = {};
  options.headers['Authorization'] = `Bearer ${access}`;
  options.headers['Content-Type'] = 'application/json';
  let response = await fetch(`${API_URL}${url}`, options);
  // Si token expiré, tente refresh
  if (response.status === 401) {
    try {
      access = await refreshToken();
      options.headers['Authorization'] = `Bearer ${access}`;
      response = await fetch(`${API_URL}${url}`, options);
    } catch (e) {
      logout();
      throw new Error('Session expirée, reconnectez-vous');
    }
  }
  return response;
}

// Vérifie si l'utilisateur est authentifié
export function isAuthenticated() {
  const token = localStorage.getItem('access');
  // Pour une version plus robuste, on pourrait décoder le JWT et vérifier sa date d'expiration
  return !!token;
}
