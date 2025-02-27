import { createContext, useEffect, useState } from "react";
import { getMyUserDataService } from "../services";
export const AuthContext = createContext();
export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMyUserDataService({ token });

        setUser(data);

        setEmail(data.email);
      } catch (error) {
        console.error("Error en getUserData:", error);
        logout();
      }
    };

    if (token) getUserData();
  }, [token, setEmail]);
  const login = (token) => {
    setToken(token);
  };
  const logout = () => {
    setToken("");
    setUser(null);
  };
  const updateUserName = (newFirstName, newLastName) => {
    setUser({
      ...user,
      first_name: newFirstName,
      last_name: newLastName,
    });
  };
  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, email, updateUserName, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
