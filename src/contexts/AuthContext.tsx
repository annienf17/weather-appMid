import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  favorites: string[];
  login: (username: string) => void;
  logout: () => void;
  addFavorite: (location: string) => void;
  removeFavorite: (location: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const login = (username: string) => {
    setUser(username);
    // Load favorites from localStorage or API
    const savedFavorites = JSON.parse(localStorage.getItem(username) || "[]");
    setFavorites(savedFavorites);
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
  };

  const addFavorite = (location: string) => {
    if (!favorites.includes(location)) {
      const updatedFavorites = [...favorites, location];
      setFavorites(updatedFavorites);
      if (user) {
        localStorage.setItem(user, JSON.stringify(updatedFavorites));
      }
    }
  };

  const removeFavorite = (location: string) => {
    const updatedFavorites = favorites.filter((fav) => fav !== location);
    setFavorites(updatedFavorites);
    if (user) {
      localStorage.setItem(user, JSON.stringify(updatedFavorites));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, favorites, login, logout, addFavorite, removeFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext };
