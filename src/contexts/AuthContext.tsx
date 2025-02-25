import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: string | null;
  favorites: string[];
  login: (username: string) => void;
  logout: () => void;
  addFavorite: (location: string) => void;
  removeFavorite: (location: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const loginTime = localStorage.getItem("loginTime");

    if (storedUser && loginTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(loginTime, 10);

      if (elapsedTime < SESSION_DURATION) {
        setUser(storedUser);
        const savedFavorites = JSON.parse(
          localStorage.getItem(storedUser) || "[]"
        );
        setFavorites(savedFavorites);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("loginTime");
      }
    }
  }, []);

  const login = (username: string) => {
    const currentTime = new Date().getTime();
    setUser(username);
    localStorage.setItem("user", username);
    localStorage.setItem("loginTime", currentTime.toString());
    const savedFavorites = JSON.parse(localStorage.getItem(username) || "[]");
    setFavorites(savedFavorites);
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
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
