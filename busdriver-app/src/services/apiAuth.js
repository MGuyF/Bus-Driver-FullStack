// Service d'authentification JWT pour React
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 secondes de timeout pour gérer les cold starts
});

// Login: récupère access et refresh tokens
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login/', {
      username: email, // Le backend attend 'username'
      password: password,
    });

    // Si la requête réussit (status 2xx), on sauvegarde les tokens
    if (response.data.access) {
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      return true; // Succès
    }
    return false; // Cas improbable où la requête réussit mais sans token

  } catch (error) {
    // Gère le timeout (démarrage à froid)
    if (error.code === 'ECONNABORTED') {
      throw new Error("Le serveur met du temps à démarrer. Veuillez réessayer dans quelques instants.");
    }

    // Gère les erreurs de login (401 - Unauthorized, etc.)
    if (error.response) {
      console.error('Login error:', error.response.data);
      return false; // Échec de l'authentification
    }

    // Gère les autres erreurs (réseau, etc.)
    throw new Error("Erreur réseau ou serveur. Veuillez réessayer.");
  }
};

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
