import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/get-user`, { withCredentials: true })
    .then((res) => { 
        setUser(res.data);
        setLoading(false);
    })
    .catch((err) => {
        console.log(err, "ERROR AUTH")
        setUser(null);
        setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;