import { useContext, useState } from "react";
import { loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./LoginPage.css";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUserService({ email, password });
      login(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 300000);
    }
  };

  return (
    <>
      <Header />
      <main className="login">
        <section className="login">
          <h1 className="login_title">Iniciar sesión</h1>
          <form className="login" onSubmit={handleForm}>
            <fieldset className="input-container">
              <label htmlFor="email">Correo electronico</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="input-container-pass">
              <label htmlFor="password">Contraseña</label>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="show_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </fieldset>
            <p className="forgot_password">¿Olvidó su contraseña?</p>
            <button className="login">Iniciar Sesion</button>
            <div className="login_error_message">
              {errorVisible && <p className="login_error_message">{error}</p>}
            </div>
            <Link className="register" to="/register">
              ¿No tiene cuenta? Crea una aqui
            </Link>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};
