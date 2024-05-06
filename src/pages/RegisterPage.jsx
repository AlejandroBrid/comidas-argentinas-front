import { useState } from "react";
import { registerUserService } from "../services";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./RegisterPage.css";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUserService({
        first_name,
        last_name,
        email,
        password,
      });
      setSuccessMessage("Cambios guardados correctamente");
      setSuccessVisible(true);

      setTimeout(() => {
        setSuccessVisible(false);
      }, 3000000);
      navigate("/login");
    } catch (error) {
      setError(error.message);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000000);
    }
  };

  return (
    <>
      <Header />
      <main className="register">
        <section className="login">
          <h1 className="login_title">
            Crea tu cuenta y disfruta nuestro fabuloso servicio
          </h1>
          <form onSubmit={handleForm} className="register">
            <fieldset className="input-container">
              <label htmlFor="first_name">Nombre</label>
              <input
                type="text"
                id="first_name"
                name="userName"
                required
                onChange={(e) => setfirst_name(e.target.value)}
              />
            </fieldset>
            <fieldset className="input-container">
              <label htmlFor="last_name">Apellidos</label>
              <input
                type="text"
                id="last_name"
                name="userName"
                required
                onChange={(e) => setlast_name(e.target.value)}
              />
            </fieldset>
            <fieldset className="input-container">
              <label htmlFor="email">Correo Electronico</label>
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
            <button className="login">Registrar</button>
            <div className="message">
              {errorVisible && <p className="register_message">{error}</p>}
              {successVisible && (
                <p className="register_message">{successMessage}</p>
              )}
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};
