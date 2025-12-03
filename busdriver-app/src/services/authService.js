const FAKE_USER = {
  email: "test@busdriver.com",
  password: "password123",
  name: "John Doe",
};

// Vérifier les identifiants de l'utilisateur
export const login = (email, password) => {
  if (email === FAKE_USER.email && password === FAKE_USER.password) {
    // Stocker les infos utilisateur en session (localStorage)
    localStorage.setItem("user", JSON.stringify(FAKE_USER));
    return true;
  }
  return false;
};

// Vérifier si un utilisateur est connecté
export const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

// Déconnexion
export const logout = () => {
  localStorage.removeItem("user");
};
