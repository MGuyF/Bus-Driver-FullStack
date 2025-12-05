const FAKE_USER = {
  email: "test@busdriver.com",
  password: "password123",
  name: "John Doe",
};

// Vérifier les identifiants de l'utilisateur
export const login = async (username, password) => {
  const response = await fetch('http://localhost:8000/api/auth/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (response.ok) {
    const data = await response.json();
    // Stocker le token JWT pour les appels API protégés
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    // Stocker le username pour l'UI (optionnel)
    localStorage.setItem('user', JSON.stringify({ username }));
    return true;
  }
  return false;
};

// Vérifier si un utilisateur est authentifié en vérifiant la présence du token JWT
export const isAuthenticated = () => {
  return localStorage.getItem("access") !== null;
};

// Déconnexion : supprime les tokens JWT et les infos utilisateur
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
};
